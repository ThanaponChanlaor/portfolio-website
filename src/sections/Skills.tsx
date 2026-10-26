import { useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tag } from '../components/ui/Tag';
import { education, skillGroups } from '../data/skills';
import { useReveal } from '../hooks/useReveal';

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <Section id="skills" background="cream" ref={ref}>
      <SectionHeading index="04" eyebrow="Skills">
        Building blocks
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <Card key={group.title} tone={group.tone} hoverLift className="p-5" data-reveal>
            <h3 className="text-lg font-extrabold">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card inkShadow className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4" data-reveal>
        <h3 className="font-extrabold">Education</h3>
        <p className="text-sm">
          {education.degree} · {education.school} · {education.year}
        </p>
      </Card>
    </Section>
  );
}
