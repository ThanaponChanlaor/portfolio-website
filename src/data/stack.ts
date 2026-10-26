import type { StackItem } from '../types';

export const stack: StackItem[] = [
  {
    layer: 'Frontend',
    title: 'React + TypeScript',
    description:
      'The map, the filters and the motion on this page: Tailwind for styling, GSAP for animation, tested with Jest and Testing Library.',
    tone: 'ice',
  },
  {
    layer: 'API',
    title: 'Go',
    description: 'Handler → service → repository layers, covered by table-driven unit tests.',
    tone: 'rose',
  },
  {
    layer: 'Database',
    title: 'PostgreSQL',
    description:
      'Projects, skills and contact messages, with versioned migrations and Docker Compose.',
    tone: 'mint',
  },
];
