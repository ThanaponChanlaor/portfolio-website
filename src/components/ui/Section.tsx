import type { ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';

type Background = 'white' | 'cream' | 'sky' | 'blush';

const backgrounds: Record<Background, string> = {
  white: 'bg-white',
  cream: 'bg-cream',
  sky: 'bg-sky',
  blush: 'bg-blush',
};

interface SectionProps {
  id: string;
  background?: Background;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

export function Section({ id, background = 'white', className, children, ref }: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      className={cx('border-b-2 border-ink py-16 md:py-24', backgrounds[background], className)}
    >
      <div className="container">{children}</div>
    </section>
  );
}
