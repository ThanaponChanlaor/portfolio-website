import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

type Variant = 'primary' | 'outline' | 'coral' | 'dark';

const variants: Record<Variant, string> = {
  primary: 'bg-sun text-ink',
  outline: 'bg-white text-ink',
  coral: 'bg-coral text-white',
  dark: 'bg-ink text-white',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-display text-sm font-bold shadow-pop-sm transition hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-60';

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Renders an `<a>` when given `href`, otherwise a `<button>`. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;
  const classes = cx(base, variants[variant], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
