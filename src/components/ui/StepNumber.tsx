import type { HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { toneBg } from '../../lib/tones';
import type { Tone } from '../../types';

interface StepNumberProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  tone?: Tone;
  size?: 'sm' | 'lg';
}

export function StepNumber({ value, tone = 'white', size = 'sm', className, ...rest }: StepNumberProps) {
  return (
    <span
      className={cx(
        'grid shrink-0 place-items-center rounded-md border-2 border-ink font-display font-extrabold',
        size === 'sm' ? 'h-7 w-7 text-sm' : 'h-10 w-10 text-base shadow-pop-sm',
        toneBg[tone],
        className,
      )}
      {...rest}
    >
      {value}
    </span>
  );
}
