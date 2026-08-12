import Link from 'next/link';

/**
 * The Pave mark: a path that starts wide and narrows to a single line — the
 * choice getting clearer, not smaller.
 */
export function PaveMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 25c0-9.5 5-16 10-16s5 5 10 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M9.5 25h13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

export function PaveWordmark({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-pave-ink pave-focus"
      aria-label="Pave — home"
    >
      <span className="text-pave-clay transition-transform group-hover:-translate-y-px">
        <PaveMark />
      </span>
      <span className="font-display text-2xl leading-none tracking-tight">Pave</span>
    </Link>
  );
}
