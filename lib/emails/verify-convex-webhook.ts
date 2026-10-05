import { timingSafeEqual } from 'node:crypto';

export type ConvexWebhookAuthResult =
  | { ok: true }
  | { ok: false; status: 401 | 500; error: string };

export function timingSafeStringEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

/**
 * Authenticate Convex → Next.js email webhook requests.
 * Production fails closed if CONVEX_WEBHOOK_SECRET is missing.
 * Local development still allows requests when the secret is unset,
 * matching the previous local workflow.
 */
export function verifyConvexWebhookAuth({
  authorizationHeader,
  expectedSecret,
  nodeEnv,
}: {
  authorizationHeader: string | null;
  expectedSecret: string | undefined;
  nodeEnv: string | undefined;
}): ConvexWebhookAuthResult {
  if (!expectedSecret) {
    if (nodeEnv === 'production') {
      console.error(
        'CONVEX_WEBHOOK_SECRET is not set. Rejecting email webhook request.'
      );
      return {
        ok: false,
        status: 500,
        error: 'Email webhook is not configured',
      };
    }

    console.warn(
      'CONVEX_WEBHOOK_SECRET is not set. Allowing email webhook in development only.'
    );
    return { ok: true };
  }

  const expectedHeader = `Bearer ${expectedSecret}`;
  const providedHeader = authorizationHeader ?? '';

  if (!timingSafeStringEqual(providedHeader, expectedHeader)) {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }

  return { ok: true };
}
