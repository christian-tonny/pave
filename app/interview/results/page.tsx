'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';
import { SignedOut } from '@clerk/nextjs';
import { isComplete } from '@/lib/pave/interview';
import { scoreInterview } from '@/lib/pave/match';
import { clearAnswers, loadAnswers } from '@/lib/pave/storage';
import { SiteFooter } from '@/components/pave/site-footer';
import type { Answers, InterviewResult, Opportunity, PathMatch, Programme } from '@/lib/pave/types';

const FIT_LABEL: Record<PathMatch['fit'], string> = {
  strong: 'Strong fit',
  good: 'Good fit',
  'worth-a-look': 'Worth a look',
};

function money(amount: number): string {
  return amount.toLocaleString('en-US');
}

function payLine(match: PathMatch): string {
  if (!match.path.entryPay) return 'You set the price — it depends entirely on what you build.';
  return `${money(match.path.entryPay.min)} – ${money(match.path.entryPay.max)} RWF a month to start`;
}

function tuitionLine(programme: Programme): string {
  if (programme.tuitionPerYear === null) return 'Fees vary — ask the institution';
  if (programme.tuitionPerYear === 0) return 'Free';
  return `about ${money(programme.tuitionPerYear)} RWF a year`;
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  const result: InterviewResult | null = useMemo(() => {
    if (!answers || !isComplete(answers) || Object.keys(answers).length === 0) return null;
    return scoreInterview(answers);
  }, [answers]);

  if (answers === null) {
    return (
      <div className="min-h-screen bg-pave-paper flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-pave-line border-t-pave-clay rounded-full animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-pave-paper">
        <div className="container mx-auto max-w-2xl px-4 py-24">
          <h1 className="font-display text-3xl text-pave-ink">Nothing here yet</h1>
          <p className="mt-4 text-pave-soft leading-relaxed">
            Your path appears once you have finished the interview. It takes about six minutes, and you
            can stop and come back.
          </p>
          <Link
            href="/interview"
            className="mt-8 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 min-h-[48px] bg-pave-ink text-white hover:bg-pave-clay transition-colors"
          >
            {Object.keys(answers).length > 0 ? 'Finish the interview' : 'Start the interview'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const active = result.matches[Math.min(activeIndex, result.matches.length - 1)];
  const others = result.matches.filter((match) => match !== active);

  const schoolsBlock = active.programmes.length > 0 ? <SchoolsSection match={active} /> : null;
  const opportunitiesBlock = <OpportunitiesSection match={active} />;

  return (
    <div className="min-h-screen bg-pave-paper text-pave-ink">
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Summary */}
        <header>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight text-balance">
            {active.path.title}
          </h1>
          <p className="mt-4 text-lg text-pave-soft leading-relaxed text-pretty">{result.summary}</p>
        </header>

        {/* The path itself */}
        <section className="mt-10 border border-pave-line bg-white p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-3">
            <span className="text-sm text-pave-clay">{FIT_LABEL[active.fit]}</span>
            <span className="text-sm text-pave-soft">{payLine(active)}</span>
          </div>

          <p className="mt-5 text-lg leading-relaxed">{active.path.tagline}</p>
          <p className="mt-3 text-pave-soft leading-relaxed">{active.path.dayToDay}</p>

          {active.reasons.length > 0 ? (
            <div className="mt-7">
              <h2 className="text-base text-pave-ink">Why this fits you</h2>
              <ul className="mt-3 space-y-2.5">
                {active.reasons.map((reason) => (
                  <li key={reason} className="leading-relaxed">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {active.tensions.length > 0 ? (
            <div className="mt-7 bg-pave-paper border border-pave-line p-5">
              <h2 className="text-base text-pave-ink">Worth knowing</h2>
              <ul className="mt-3 space-y-2.5">
                {active.tensions.map((tension) => (
                  <li key={tension} className="text-pave-soft leading-relaxed">
                    {tension}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {active.route ? (
            <div className="mt-7 border-t border-pave-line pt-6">
              <h2 className="text-base text-pave-ink">How you get on it</h2>
              <p className="mt-3 text-lg">{active.route.label}</p>
              <p className="text-sm text-pave-soft">{active.route.duration}</p>
              <p className="mt-2 text-pave-soft leading-relaxed">{active.route.reality}</p>
            </div>
          ) : null}
        </section>

        {/* Schools first for anyone not yet in tertiary; otherwise jobs first. */}
        {result.schoolsFirst ? (
          <>
            {schoolsBlock}
            {opportunitiesBlock}
          </>
        ) : (
          <>
            {opportunitiesBlock}
            {schoolsBlock}
          </>
        )}

        {result.funding.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Paying for it</h2>
            <p className="mt-2 text-pave-soft">
              You said the money is not already covered. Start with these two.
            </p>
            <div className="mt-5 space-y-3">
              {result.funding.map((item) => (
                <OpportunityRow key={item.id} opportunity={item} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Next steps */}
        <section className="mt-12">
          <h2 className="font-display text-2xl">Do this week</h2>
          <ol className="mt-5 space-y-4">
            {active.nextSteps.map((step, position) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-pave-clay text-lg leading-7 tabular-nums">
                  {String(position + 1).padStart(2, '0')}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Other paths */}
        {others.length > 0 ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl">Also worth a look</h2>
            <p className="mt-2 text-pave-soft">
              Your answers fit these too. Open one to see its route, schools and next steps instead.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((match) => (
                <button
                  key={match.path.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(result.matches.indexOf(match));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left border border-pave-line bg-white p-5 hover:border-pave-soft/50 transition-colors pave-focus"
                >
                  <span className="block text-sm text-pave-soft">{FIT_LABEL[match.fit]}</span>
                  <span className="mt-1 block text-lg">{match.path.title}</span>
                  <span className="mt-2 block text-pave-soft leading-relaxed">{match.path.tagline}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-pave-clay">
                    Open this path
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {/* Housekeeping */}
        <section className="mt-14 border-t border-pave-line pt-8 space-y-4 text-sm text-pave-soft">
          <SignedOut>
            <p>
              Your answers live in this browser only.{' '}
              <Link href="/sign-up" className="underline decoration-pave-line hover:text-pave-ink">
                Make an account
              </Link>{' '}
              to keep this path.
            </p>
          </SignedOut>
          <p>
            Fees, intakes and openings change. Confirm anything here with the institution or employer
            before you act on it — the links go to their own pages.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                clearAnswers();
                window.location.href = '/interview';
              }}
              className="inline-flex items-center gap-2 text-pave-soft hover:text-pave-ink transition-colors pave-focus rounded-md"
            >
              <RotateCcw className="w-4 h-4" />
              Take the interview again
            </button>
            <Link href="/careers" className="text-pave-soft hover:text-pave-ink transition-colors">
              Browse every career in the library
            </Link>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}

function SchoolsSection({ match }: { match: PathMatch }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">Where you would study</h2>
      <p className="mt-2 text-pave-soft">
        Programmes that lead to this work, closest to what you said you can commit to.
      </p>

      <div className="mt-5 space-y-3">
        {match.programmes.map((programme) => (
          <a
            key={programme.id}
            href={programme.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-pave-line bg-white p-5 hover:border-pave-soft/50 transition-colors pave-focus"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg leading-snug">{programme.name}</p>
                <p className="mt-1 text-pave-soft">{programme.institution}</p>
              </div>
              <ExternalLink className="w-4 h-4 mt-1.5 flex-shrink-0 text-pave-soft" />
            </div>
            <p className="mt-3 text-sm text-pave-soft">
              {programme.duration} · {programme.location} · {tuitionLine(programme)}
            </p>
            {programme.note ? (
              <p className="mt-2 text-sm text-pave-soft leading-relaxed">{programme.note}</p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}

function OpportunitiesSection({ match }: { match: PathMatch }) {
  if (match.opportunities.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="font-display text-2xl">Where to apply</h2>
        <p className="mt-2 text-pave-soft">
          We do not have verified openings on this path yet. Start with the route above.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">Where to apply</h2>
      <p className="mt-2 text-pave-soft">
        Employers, programmes and the boards where these posts appear. What is open changes weekly —
        check the source.
      </p>
      <div className="mt-5 space-y-3">
        {match.opportunities.map((opportunity) => (
          <OpportunityRow key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    </section>
  );
}

const KIND_LABEL: Record<Opportunity['kind'], string> = {
  employer: 'Employer',
  internship: 'Placement',
  programme: 'Programme',
  board: 'Where posts appear',
  funding: 'Money',
};

function OpportunityRow({ opportunity }: { opportunity: Opportunity }) {
  return (
    <a
      href={opportunity.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-pave-line bg-white p-5 hover:border-pave-soft/50 transition-colors pave-focus"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-pave-soft">
            {KIND_LABEL[opportunity.kind]}
          </p>
          <p className="mt-1.5 text-lg leading-snug">{opportunity.org}</p>
          <p className="text-pave-soft">{opportunity.title}</p>
        </div>
        <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 text-pave-soft" />
      </div>
      <p className="mt-3 text-pave-soft leading-relaxed">{opportunity.blurb}</p>
      <p className="mt-2 text-sm text-pave-soft">{opportunity.location}</p>
    </a>
  );
}
