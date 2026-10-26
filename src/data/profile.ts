import type { NavLink, Profile } from '../types';

export const profile: Profile = {
  initials: 'TC',
  firstName: 'Thanapon',
  lastName: 'Chanla-or',
  applyingFor: 'Open to Senior Developer and Product Owner roles',
  intro:
    'Tech Lead and Software Developer with 3+ years building web platforms for government, healthcare and financial clients, from presale through go-live. I develop with React.js, TypeScript and CMS platforms, review code and guide developers, and step into Product Owner and BA roles when projects need it, often on at-risk projects, renegotiating scope and bringing them back to a positive margin.',
  location: 'Nong Chok, Bangkok',
  email: 'chanlaor.t@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/thanapon-chanla-or',
  linkedinLabel: 'linkedin.com/in/thanapon-chanla-or',
  // TODO: replace with the real repository URL.
  githubUrl: 'https://github.com/',
  cvUrl: '/Thanapon_Chanlaor_Resume_Senior_Software_Developer.pdf',
  cvFileName: 'Thanapon_Chanla-or_Resume.pdf',
};

export const navLinks: NavLink[] = [
  { label: 'Role fit', href: '#role-fit' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  // { label: 'This site', href: '#this-site' }, // section disabled in App.tsx
];
