import { RESULT_VERSION } from './match';
import type { Answers } from './types';

/**
 * The interview is kept in the browser so that a refresh, a dropped connection or
 * a walk to a better signal never costs someone their answers.
 *
 * Convex persistence per account is the next step; nothing here assumes it.
 */
const ANSWERS_KEY = 'pave.interview.answers.v1';
const VERSION_KEY = 'pave.interview.version';

function available(): boolean {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function loadAnswers(): Answers {
  if (!available()) return {};
  try {
    const storedVersion = Number(window.localStorage.getItem(VERSION_KEY) ?? RESULT_VERSION);
    if (storedVersion !== RESULT_VERSION) {
      clearAnswers();
      return {};
    }
    const raw = window.localStorage.getItem(ANSWERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};

    // Be strict about the shape — a half-written value should not break the interview.
    const answers: Answers = {};
    for (const [questionId, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
        answers[questionId] = value as string[];
      }
    }
    return answers;
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Answers): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    window.localStorage.setItem(VERSION_KEY, String(RESULT_VERSION));
  } catch {
    // A full or blocked storage quota must never stop the interview.
  }
}

export function clearAnswers(): void {
  if (!available()) return;
  try {
    window.localStorage.removeItem(ANSWERS_KEY);
    window.localStorage.removeItem(VERSION_KEY);
  } catch {
    // Nothing to do.
  }
}
