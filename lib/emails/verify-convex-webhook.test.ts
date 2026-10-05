import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import {
  timingSafeStringEqual,
  verifyConvexWebhookAuth,
} from './verify-convex-webhook.ts';

const originalError = console.error;
const originalWarn = console.warn;

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

function silenceLogs() {
  console.error = () => {};
  console.warn = () => {};
}

test('production rejects requests when the secret is missing', () => {
  silenceLogs();
  const result = verifyConvexWebhookAuth({
    authorizationHeader: 'Bearer anything',
    expectedSecret: undefined,
    nodeEnv: 'production',
  });
  assert.deepEqual(result, {
    ok: false,
    status: 500,
    error: 'Email webhook is not configured',
  });
});

test('production rejects a missing Authorization header', () => {
  const result = verifyConvexWebhookAuth({
    authorizationHeader: null,
    expectedSecret: 'super-secret',
    nodeEnv: 'production',
  });
  assert.deepEqual(result, {
    ok: false,
    status: 401,
    error: 'Unauthorized',
  });
});

test('production rejects a token that does not match', () => {
  const result = verifyConvexWebhookAuth({
    authorizationHeader: 'Bearer wrong-secret',
    expectedSecret: 'super-secret',
    nodeEnv: 'production',
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
  }
});

test('production accepts a matching Bearer token', () => {
  const result = verifyConvexWebhookAuth({
    authorizationHeader: 'Bearer super-secret',
    expectedSecret: 'super-secret',
    nodeEnv: 'production',
  });
  assert.deepEqual(result, { ok: true });
});

test('development allows requests when the secret is unset', () => {
  silenceLogs();
  const result = verifyConvexWebhookAuth({
    authorizationHeader: null,
    expectedSecret: undefined,
    nodeEnv: 'development',
  });
  assert.deepEqual(result, { ok: true });
});

test('development still requires a matching token when the secret is set', () => {
  const denied = verifyConvexWebhookAuth({
    authorizationHeader: 'Bearer nope',
    expectedSecret: 'local-secret',
    nodeEnv: 'development',
  });
  assert.equal(denied.ok, false);

  const allowed = verifyConvexWebhookAuth({
    authorizationHeader: 'Bearer local-secret',
    expectedSecret: 'local-secret',
    nodeEnv: 'development',
  });
  assert.deepEqual(allowed, { ok: true });
});

test('timingSafeStringEqual returns false for different lengths without throwing', () => {
  assert.equal(timingSafeStringEqual('short', 'much-longer-value'), false);
  assert.equal(timingSafeStringEqual('same-length--a', 'same-length--b'), false);
  assert.equal(timingSafeStringEqual('match-me', 'match-me'), true);
});
