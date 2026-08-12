'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SignedOut } from '@clerk/nextjs';
import { isComplete, visibleQuestions } from '@/lib/pave/interview';
import { loadAnswers, saveAnswers } from '@/lib/pave/storage';
import type { Answers, InterviewQuestion } from '@/lib/pave/types';

export default function InterviewPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [restored, setRestored] = useState(false);

  // Pick up an interview left half-finished, on this device — or go straight to the
  // path if it is already answered.
  useEffect(() => {
    const saved = loadAnswers();
    if (isComplete(saved) && Object.keys(saved).length > 0) {
      router.replace('/interview/results');
      return;
    }
    const questions = visibleQuestions(saved);
    const firstUnanswered = questions.findIndex((question) => (saved[question.id] ?? []).length === 0);
    setAnswers(saved);
    setIndex(firstUnanswered === -1 ? Math.max(0, questions.length - 1) : firstUnanswered);
    setRestored(true);
  }, [router]);

  const questions = useMemo(() => visibleQuestions(answers), [answers]);
  const total = questions.length;
  const question: InterviewQuestion | undefined = questions[Math.min(index, total - 1)];
  const selected = question ? answers[question.id] ?? [] : [];
  const multi = Boolean(question?.maxChoices && question.maxChoices > 1);
  const canContinue = selected.length > 0;

  // An earlier answer can remove a later question, so never point past the end.
  useEffect(() => {
    if (total > 0 && index > total - 1) setIndex(total - 1);
  }, [index, total]);

  const commit = useCallback((next: Answers) => {
    setAnswers(next);
    saveAnswers(next);
  }, []);

  const goNext = useCallback(
    (current: Answers) => {
      const upcoming = visibleQuestions(current);
      if (index < upcoming.length - 1) {
        setIndex(index + 1);
        return;
      }
      if (isComplete(current)) {
        router.push('/interview/results');
        return;
      }
      // A changed answer can reopen an earlier question — go back to it rather
      // than sitting on a dead "See my path" button.
      const gap = upcoming.findIndex((item) => (current[item.id] ?? []).length === 0);
      if (gap !== -1) setIndex(gap);
    },
    [index, router],
  );

  const choose = useCallback(
    (optionId: string) => {
      if (!question) return;

      if (multi) {
        const max = question.maxChoices ?? 2;
        const already = selected.includes(optionId);
        const nextSelection = already
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId].slice(-max);
        commit({ ...answers, [question.id]: nextSelection });
        return;
      }

      const next = { ...answers, [question.id]: [optionId] };
      commit(next);
      // Single-select advances on its own — twelve questions should feel like a
      // conversation, not a form. Back is always one tap away.
      window.setTimeout(() => goNext(next), 220);
    },
    [answers, commit, goNext, multi, question, selected],
  );

  const goBack = useCallback(() => {
    if (index === 0) {
      router.push('/');
      return;
    }
    setIndex(index - 1);
  }, [index, router]);

  // Number keys select, Enter continues.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!question) return;
      if (event.key === 'Enter' && canContinue) {
        event.preventDefault();
        goNext(answers);
        return;
      }
      const digit = Number(event.key);
      if (!Number.isNaN(digit) && digit >= 1 && digit <= question.options.length) {
        event.preventDefault();
        choose(question.options[digit - 1].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [answers, canContinue, choose, goNext, question]);

  if (!restored) {
    return (
      <div className="min-h-screen bg-pave-paper flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pave-line border-t-pave-clay rounded-full animate-spin" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-pave-paper flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-pave-ink">This interview is finished.</p>
          <Link
            href="/interview/results"
            className="mt-4 inline-flex items-center px-5 py-3 bg-pave-ink text-white rounded-full hover:bg-pave-clay transition-colors"
          >
            See your path
          </Link>
        </div>
      </div>
    );
  }

  const answeredCount = questions.filter((item) => (answers[item.id] ?? []).length > 0).length;
  const progress = Math.round((answeredCount / total) * 100);

  return (
    <div className="min-h-screen bg-pave-paper">
      <div className="container mx-auto max-w-2xl px-4 py-10 sm:py-16">
        {/* Progress */}
        <div className="flex items-baseline justify-between text-sm text-pave-soft">
          <span>{question.section}</span>
          <span>
            {Math.min(index + 1, total)} of {total}
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-pave-line" role="presentation">
          <div
            className="h-px bg-pave-clay transition-all duration-300"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>

        {/* Question */}
        <div className="mt-10">
          <h1 className="font-display text-2xl sm:text-3xl leading-snug text-pave-ink text-balance">
            {question.prompt}
          </h1>
          {question.help ? (
            <p className="mt-3 text-pave-soft leading-relaxed">{question.help}</p>
          ) : null}
          {multi ? (
            <p className="mt-2 text-sm text-pave-soft">
              Pick up to {question.maxChoices}
              {selected.length > 0 ? ` · ${selected.length} chosen` : ''}
            </p>
          ) : null}
        </div>

        {/* Options */}
        <div className="mt-8 space-y-2.5">
          {question.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                aria-pressed={isSelected}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all pave-focus ${
                  isSelected
                    ? 'border-pave-clay bg-pave-clay-soft'
                    : 'border-pave-line bg-white hover:border-pave-soft/50'
                }`}
              >
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-pave-ink">{option.label}</span>
                    {option.note ? (
                      <span className="mt-0.5 block text-sm text-pave-soft">{option.note}</span>
                    ) : null}
                  </span>
                  {isSelected ? (
                    <Check className="mt-0.5 w-5 h-5 flex-shrink-0 text-pave-clay" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 px-3 py-2 -ml-3 text-pave-soft hover:text-pave-ink transition-colors pave-focus rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={() => goNext(answers)}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-pave-ink text-white rounded-full transition-colors hover:bg-pave-clay disabled:opacity-30 disabled:hover:bg-pave-ink pave-focus"
          >
            {index === total - 1 ? 'See my path' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <SignedOut>
          <p className="mt-10 text-sm text-pave-soft border-t border-pave-line pt-6">
            Your answers are saved on this device.{' '}
            <Link href="/sign-up" className="underline decoration-pave-line hover:text-pave-ink">
              Make an account
            </Link>{' '}
            so your path is still here on another one.
          </p>
        </SignedOut>
      </div>
    </div>
  );
}
