import Link from 'next/link';
import { PaveMark } from '@/components/pave/logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-pave-line bg-pave-paper">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-pave-ink">
              <span className="text-pave-clay">
                <PaveMark className="w-6 h-6" />
              </span>
              <span className="font-display text-xl leading-none">Pave</span>
            </div>
            <p className="mt-3 text-sm text-pave-soft leading-relaxed">
              Find the career path that fits you. Built in Rwanda, for people deciding what to do next.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link href="/interview" className="text-pave-soft hover:text-pave-ink transition-colors">
              The interview
            </Link>
            <Link href="/careers" className="text-pave-soft hover:text-pave-ink transition-colors">
              Careers
            </Link>
            <Link href="/sign-up" className="text-pave-soft hover:text-pave-ink transition-colors">
              Sign up
            </Link>
            <Link href="/about" className="text-pave-soft hover:text-pave-ink transition-colors">
              About
            </Link>
            <Link href="/sign-in" className="text-pave-soft hover:text-pave-ink transition-colors">
              Sign in
            </Link>
            <Link href="/privacy" className="text-pave-soft hover:text-pave-ink transition-colors">
              Privacy
            </Link>
          </nav>
        </div>

        <p className="mt-10 pt-6 border-t border-pave-line text-xs text-pave-soft">
          © {new Date().getFullYear()} Pave. Institution and opportunity details are curated from public
          sources — confirm dates, fees and requirements with the institution before you act on them.
        </p>
      </div>
    </footer>
  );
}
