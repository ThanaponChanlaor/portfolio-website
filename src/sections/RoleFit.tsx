import { useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { StepNumber } from '../components/ui/StepNumber';
import { roleFit } from '../data/roleFit';
import { useReveal } from '../hooks/useReveal';

export function RoleFit() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <Section id="role-fit" ref={ref}>
      <SectionHeading index="01" eyebrow="Role fit">
        Every stop on the map, matched to the role
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {roleFit.map((item) => (
          <Card key={item.step} tone={item.tone} hoverLift className="flex flex-col p-5" data-reveal>
            <div className="flex items-center gap-3">
              <StepNumber value={item.step} />
              <h3 className="text-lg font-extrabold">{item.title}</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink/70">{item.requirement}</p>
            <hr className="my-3 border-t-2 border-dashed border-ink/40" />
            <p className="text-sm leading-relaxed">{item.evidence}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
