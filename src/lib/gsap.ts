import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register once; every component imports GSAP from here.
gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

/** Use with gsap.matchMedia() so animations are skipped for reduced-motion users. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export function prefersMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(MOTION_OK).matches;
}

export { gsap, Flip, ScrollTrigger, useGSAP };
