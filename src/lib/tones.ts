import type { Tone } from '../types';

// Full class strings so Tailwind can find them when scanning the source.
export const toneBg: Record<Tone, string> = {
  white: 'bg-white',
  peach: 'bg-peach',
  lilac: 'bg-lilac',
  ice: 'bg-ice',
  mint: 'bg-mint',
  fog: 'bg-fog',
  butter: 'bg-butter',
  rose: 'bg-rose',
};

export const toneShadow: Record<Tone, string> = {
  white: 'shadow-fog-shade',
  peach: 'shadow-peach-shade',
  lilac: 'shadow-lilac-shade',
  ice: 'shadow-ice-shade',
  mint: 'shadow-mint-shade',
  fog: 'shadow-fog-shade',
  butter: 'shadow-butter-shade',
  rose: 'shadow-rose-shade',
};
