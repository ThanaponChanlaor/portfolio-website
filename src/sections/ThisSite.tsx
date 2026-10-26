import { useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { profile } from '../data/profile';
import { stack } from '../data/stack';
import { useReveal } from '../hooks/useReveal';

export function ThisSite() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <Section id="this-site" ref={ref}>
      <SectionHeading index="05" eyebrow="This site">
        Built on the stack the role asks for
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-3">
        {stack.map((item) => (
          <Card key={item.layer} tone={item.tone} hoverLift className="p-5" data-reveal>
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-ink/60">{item.layer}</p>
            <h3 className="mt-1 text-lg font-extrabold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed">{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8" data-reveal>
        <Button href={profile.githubUrl} variant="outline" target="_blank" rel="noopener noreferrer">
          View source on GitHub
        </Button>
      </div>
    </Section>
  );
}
