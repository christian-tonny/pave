import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/pave/site-footer';
import { AdminRedirect } from '@/components/pave/admin-redirect';

const STEPS = [
  {
    number: '01',
    title: 'Make an account',
    body: 'So your path is still here next week, on whichever phone you open it on.',
  },
  {
    number: '02',
    title: 'Answer twelve questions',
    body: 'Your combination, what people come to you for, what you can commit to, how you get online, where you can be. About six minutes.',
  },
  {
    number: '03',
    title: 'Get a path you can start',
    body: 'One path that fits, two worth a look, and the first thing to do about it this week.',
  },
];

const DELIVERABLES = [
  {
    title: 'Opportunities to apply to',
    body: 'Real employers and programmes — Irembo, One Acre Fund, district hospitals, REG, hotels in Musanze — and the boards where the posts actually appear.',
  },
  {
    title: 'Schools and programmes',
    body: 'If you have not started tertiary yet: the degree, the IPRC diploma and the short certified course that lead to the same work, with fees and where they are.',
  },
  {
    title: 'Next steps this week',
    body: 'Four or five specific moves. Volunteer at the health centre. Sit the first CPA paper. Take one dataset from NISR and write a page about it.',
  },
];

const HONEST = [
  'Money in RWF, from Rwandan employers — not American salary averages.',
  'A TVET diploma or a certified trade is a real answer here, not a consolation prize.',
  'It asks whether you have a laptop, because some paths need one and most do not.',
  'No personality label without a next step attached to it.',
];

export default function LandingPage() {
  return (
    <div className="bg-pave-paper text-pave-ink">
      <AdminRedirect />

      {/* Hero — the promise, and one way in */}
      <section className="px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="container mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-pave-soft">
            For anyone in Rwanda deciding what to do next
          </p>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
            Find the career path that fits you.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-pave-soft leading-relaxed max-w-2xl text-pretty">
            Not the path that pays most on a website written for somewhere else. The one that fits what
            you are good at, what you can commit to, and where you can actually be — with the
            opportunities, the schools and the next step attached.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[52px] bg-pave-ink text-white text-base rounded-full hover:bg-pave-clay transition-colors pave-focus"
            >
              Start the interview
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="text-sm text-pave-soft">
              Free · about six minutes ·{' '}
              <Link href="/sign-in" className="underline decoration-pave-line hover:text-pave-ink">
                already started?
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-20 border-t border-pave-line">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl">How it works</h2>

          <ol className="mt-10 grid gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.number}>
                <p className="font-display text-pave-clay text-lg">{step.number}</p>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-pave-soft leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you walk away with */}
      <section className="px-4 py-16 sm:py-20 border-t border-pave-line bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl sm:text-3xl">What you walk away with</h2>
          <p className="mt-3 text-pave-soft max-w-2xl">
            The interview ends on one screen you can act from — not a score, and not a personality type.
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {DELIVERABLES.map((item) => (
              <div key={item.title}>
                <div className="h-px w-12 bg-pave-clay" />
                <h3 className="mt-4 text-lg">{item.title}</h3>
                <p className="mt-2 text-pave-soft leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it is different here */}
      <section className="px-4 py-16 sm:py-20 border-t border-pave-line">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl">Built for here</h2>
          <ul className="mt-8 space-y-4">
            {HONEST.map((line) => (
              <li key={line} className="flex gap-4 text-pave-soft leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pave-clay" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The wider idea, stated quietly */}
      <section className="px-4 py-16 sm:py-20 border-t border-pave-line bg-pave-forest text-white">
        <div className="container mx-auto max-w-3xl">
          <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">
            People find work worth their dedication. Companies find talent that means it. Schools find
            students who chose them on purpose.
          </p>
          <p className="mt-6 text-white/70 leading-relaxed">
            Pave starts with the person. Get that right and the other two sides follow.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="px-4 py-20 sm:py-24 border-t border-pave-line">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-balance">
            Twelve questions between you and a clearer answer.
          </h2>
          <div className="mt-8">
            <Link
              href="/sign-up"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[52px] bg-pave-ink text-white text-base rounded-full hover:bg-pave-clay transition-colors pave-focus"
            >
              Start the interview
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
