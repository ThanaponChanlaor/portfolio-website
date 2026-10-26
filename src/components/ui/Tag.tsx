import type { ReactNode } from 'react';

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border-2 border-ink bg-white px-2 py-0.5 text-xs font-semibold">
      {children}
    </span>
  );
}
