'use client';

import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { PaveMark } from '@/components/pave/logo';

/**
 * One way in. Sign up, then straight into the interview.
 *
 * Educators and professionals still have their own sign-up routes — linked at the
 * bottom rather than put in front of a student deciding what to do next.
 */
export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-pave-paper px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <span className="inline-flex text-pave-clay">
            <PaveMark className="w-8 h-8" />
          </span>
          <h1 className="mt-4 font-display text-3xl text-pave-ink">Start your interview</h1>
          <p className="mt-3 text-pave-soft leading-relaxed">
            An account keeps your path when you close the tab. Twelve questions, about six minutes, and
            you can leave and come back.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <SignUp
            routing="hash"
            signInUrl="/sign-in"
            forceRedirectUrl="/interview"
            appearance={{
              variables: {
                colorPrimary: '#B4471F',
                colorText: '#17130F',
                colorBackground: '#FFFFFF',
                borderRadius: '0.5rem',
                fontSize: '15px',
              },
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border border-pave-line rounded-xl',
                headerTitle: 'font-display',
                footerAction: 'text-pave-soft',
              },
            }}
          />
        </div>

        <p className="mt-8 text-center text-sm text-pave-soft">
          Joining as an educator or a professional?{' '}
          <Link href="/sign-up/educator" className="underline decoration-pave-line hover:text-pave-ink">
            Educator
          </Link>{' '}
          ·{' '}
          <Link href="/sign-up/mentor" className="underline decoration-pave-line hover:text-pave-ink">
            Professional
          </Link>
        </p>
      </div>
    </div>
  );
}
