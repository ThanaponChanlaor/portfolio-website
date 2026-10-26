import type { Education, SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['React.js', 'TypeScript', 'JavaScript', 'Redux', 'HTML', 'CSS', 'Tailwind', 'MUI', 'Ant Design'],
    tone: 'ice',
  },
  {
    title: 'Backend & CMS',
    skills: ['Node.js', 'Keycloak', 'WordPress', 'Joomla', 'Strapi'],
    tone: 'rose',
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'Git', 'Amazon EC2', 'Azure Virtual Machines', 'Ubuntu'],
    tone: 'mint',
  },
  {
    title: 'Leadership & people',
    skills: [
      'Code Review',
      'Team Leadership',
      'Vendor Management',
      'Requirements Analysis',
      'Stakeholder Management',
      'Cross-functional Communication',
      'Team Collaboration',
    ],
    tone: 'butter',
  },
];

export const education: Education = {
  degree: 'Bachelor of Science in Information Technology',
  school: "King Mongkut's Institute of Technology Ladkrabang",
  year: '2022',
};
