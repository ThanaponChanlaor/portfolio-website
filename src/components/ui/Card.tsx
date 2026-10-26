import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { toneBg, toneShadow } from '../../lib/tones';
import type { Tone } from '../../types';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** Use a dark ink shadow instead of the tone's shade. */
  inkShadow?: boolean;
  hoverLift?: boolean;
}

export function Card({ tone = 'white', inkShadow, hoverLift, className, ...rest }: CardProps) {
  return (
    <div
      className={cx(
        'rounded-2xl border-2 border-ink shadow-pop',
        toneBg[tone],
        inkShadow ? 'shadow-ink' : toneShadow[tone],
        hoverLift && 'transition-transform duration-200 hover:-translate-y-1',
        className,
      )}
      {...rest}
    />
  );
}
