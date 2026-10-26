import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-[0.6875rem] font-semibold',
        className,
      )}
    >
      {children}
    </span>
  );
}
