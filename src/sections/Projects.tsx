import { useRef, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { projectFilters, projects } from '../data/projects';
import { useReveal } from '../hooks/useReveal';
import { cx } from '../lib/cx';
import { Flip, gsap, prefersMotion, useGSAP } from '../lib/gsap';
import type { ProjectRole } from '../types';

type Filter = ProjectRole | 'all';

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const flipTween = useRef<gsap.core.Timeline | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  useReveal(ref);

  const visible = filter === 'all' ? projects : projects.filter((p) => p.roles.includes(filter));

  const changeFilter = (next: Filter) => {
    if (next === filter) return;
    if (prefersMotion()) {
      // Record where cards are right now (even mid-animation), then stop any running flip
      // so two animations never fight over the same cards.
      flipState.current = Flip.getState('[data-flip-id]');
      flipTween.current?.kill();
    }
    setFilter(next);
  };

  // After the re-render, animate cards from their old positions to the new ones.
  useGSAP(
    () => {
      if (!flipState.current) return;
      flipTween.current = Flip.from(flipState.current, {
        duration: 0.4,
        ease: 'power2.out',
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
          ),
      });
      flipState.current = null;
    },
    { dependencies: [filter], scope: ref },
  );

  return (
    <Section id="projects" ref={ref}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading index="03" eyebrow="Projects" className="!mb-0">
          Seven projects, 2023–2026
        </SectionHeading>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by role"
          data-reveal
        >
          {projectFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => changeFilter(f.value)}
              className={cx(
                'rounded-full border-2 border-ink px-4 py-1 text-xs font-bold transition',
                filter === f.value ? 'bg-ink text-white' : 'bg-white hover:bg-fog',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 lg:grid-cols-3" data-reveal>
        {/* GSAP Flip moves the outer wrapper; the Card inside keeps its CSS hover transition.
            Putting both on one element makes the CSS transition lag behind every Flip frame. */}
        {visible.map((project) => (
          <div key={project.id} data-flip-id={project.id}>
            <Card tone={project.tone} hoverLift className="flex h-full flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <Badge>{project.roleLabel}</Badge>
                <span className="font-display text-sm font-extrabold">{project.year}</span>
              </div>
              <h3 className="mt-3 text-lg font-extrabold leading-snug">{project.title}</h3>
              <p className="mt-1 text-xs font-semibold text-ink/60">{project.sector}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
