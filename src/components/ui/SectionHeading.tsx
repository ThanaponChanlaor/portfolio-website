import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ index, eyebrow, children, className }: SectionHeadingProps) {
  return (
    <header className={cx('mb-8 md:mb-10', className)} data-reveal>
      <p className="mb-2 text-sm font-bold text-coral-dark">
        {index} — {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">{children}</h2>
    </header>
  );
}
