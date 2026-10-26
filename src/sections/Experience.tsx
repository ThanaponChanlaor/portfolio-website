import { useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StepNumber } from '../components/ui/StepNumber';
import { experience } from '../data/experience';
import { useReveal } from '../hooks/useReveal';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const trigger = { trigger: '[data-timeline]', start: 'top 80%', once: true };

        // Draw the track as the timeline scrolls into view.
        gsap.from('[data-track]', {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 85%', end: 'top 40%', scrub: 0.6 },
        });
        gsap.from('[data-stage-num]', {
          scale: 0,
          rotate: -20,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(3)',
          scrollTrigger: trigger,
        });
        gsap.from('[data-stage-body]', {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: trigger,
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section id="experience" background="cream" ref={ref}>
      <SectionHeading index="02" eyebrow="Experience">
        {experience.company}
      </SectionHeading>

      <Card inkShadow className="p-6 md:p-8" data-reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold md:text-2xl">{experience.headline}</h3>
          <span className="rounded-full border-2 border-ink bg-sun px-3 py-1 text-xs font-bold">
            {experience.period}
          </span>
        </div>

        <div data-timeline className="relative mt-8 grid gap-8 md:grid-cols-3">
          {/* Striped track behind the step numbers (desktop only). */}
          <div
            data-track
            aria-hidden="true"
            className="absolute left-5 right-0 top-4 hidden h-3 rounded-full border-2 border-ink bg-rose md:block"
          >
            <div className="mx-2 mt-[0.1875rem] border-t-2 border-dashed border-white" />
          </div>

          {experience.stages.map((stage, i) => (
            <div key={stage.title} className="relative">
              <StepNumber value={i + 1} tone={stage.tone} size="lg" data-stage-num />
              <div data-stage-body>
                <h4 className="mt-4 text-lg font-extrabold">{stage.title}</h4>
                <p className="text-xs font-semibold text-ink/60">{stage.period}</p>
                <p className="mt-2 text-sm leading-relaxed">{stage.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
