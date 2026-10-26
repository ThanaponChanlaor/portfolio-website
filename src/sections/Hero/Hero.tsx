import { useRef } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { profile } from '../../data/profile';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { IsometricMap } from './IsometricMap';

/** Splits text into spans so GSAP can animate each letter. */
function Letters({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="block whitespace-nowrap">
      {Array.from(text).map((char, i) => (
        <span key={i} className="hero-letter inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}

const clouds = [
  'left-[4%] top-24 h-10 w-28',
  'left-[42%] top-16 h-8 w-20',
  'right-[6%] top-40 h-12 w-32',
  'left-[30%] bottom-10 h-8 w-24',
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-hero-badge]', { y: -20, autoAlpha: 0, duration: 0.5 })
          .from(
            '.hero-letter',
            {
              yPercent: -120,
              autoAlpha: 0,
              rotate: () => gsap.utils.random(-15, 15),
              duration: 0.7,
              stagger: 0.04,
              ease: 'back.out(2)',
            },
            '-=0.2',
          )
          .from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.12 }, '-=0.3')
          .from('[data-hero-map]', { scale: 0.85, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.4)' }, 0.2)
          .from('[data-pin]', { scale: 0, autoAlpha: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(3)' }, '-=0.4');

        // Idle loops.
        gsap.to('[data-hero-map]', { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('[data-pin]', {
          y: -5,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.15, from: 'random' },
        });
        gsap.to('[data-cloud]', {
          x: () => gsap.utils.random(20, 60),
          duration: () => gsap.utils.random(6, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: ref },
  );

  return (
    <header ref={ref} id="top" className="relative overflow-hidden border-b-2 border-ink bg-sky pb-16 pt-28 md:pb-24">
      {clouds.map((position) => (
        <span key={position} data-cloud aria-hidden="true" className={`absolute rounded-full bg-white/80 ${position}`} />
      ))}

      <div className="container relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span data-hero-badge className="inline-block">
            <Badge className="px-3 py-1 text-xs">{profile.applyingFor}</Badge>
          </span>

          <h1
            aria-label={`${profile.firstName} ${profile.lastName}`}
            className="hero-title mt-6 -rotate-2 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl"
          >
            <Letters text={profile.firstName} />
            <Letters text={profile.lastName} />
          </h1>

          <p data-hero-fade className="mt-8 max-w-xl leading-relaxed">
            {profile.intro}
          </p>

          <div data-hero-fade className="mt-8 flex flex-wrap gap-4">
            <Button href="#projects">View projects</Button>
            <Button href={profile.cvUrl} variant="outline" download={profile.cvFileName}>
              Download Resume
            </Button>
          </div>
        </div>

        <IsometricMap />
      </div>
    </header>
  );
}
