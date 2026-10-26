import type { RefObject } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../lib/gsap';

/**
 * Fades and slides up every `[data-reveal]` element inside `scope`
 * as it scrolls into view, staggering elements that enter together.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope.current);
        gsap.set(items, { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              overwrite: true,
              // Hand transforms back to CSS so Tailwind hover effects still work.
              clearProps: 'transform',
            }),
        });
      });
    },
    { scope },
  );
}
