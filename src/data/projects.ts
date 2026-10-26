import type { Project, ProjectRole } from '../types';

export const projectFilters: Array<{ value: ProjectRole | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'dev', label: 'Dev' },
  { value: 'techlead', label: 'Tech Lead' },
  { value: 'ba', label: 'BA' },
  { value: 'po', label: 'PO' },
];

export const projects: Project[] = [
  {
    id: 'geospatial-health',
    title: 'Geospatial Public Health & Accessibility Platform',
    year: '2026',
    sector: 'Government',
    roleLabel: 'BA · Tech Lead',
    roles: ['ba', 'techlead'],
    description:
      'Designed a solution within a tight budget that helped win the presale, then led delivery as Tech Lead, covering BA duties, managing man-days through go-live and building a LINE Messaging API webhook.',
    tags: ['Presale', 'Man-day control', 'LINE webhook'],
    tone: 'ice',
  },
  {
    id: 'corporate-cms',
    title: 'Corporate CMS Platform on WordPress',
    year: '2026',
    sector: 'Government',
    roleLabel: 'Tech Lead',
    roles: ['techlead'],
    description:
      "Proposed an open-source CMS to replace a product the client's developers couldn't customize, winning the project, then led delivery as Tech Lead and sole CMS specialist, reviewing code and managing man-days.",
    tags: ['WordPress', 'Headless CMS', 'Code review'],
    tone: 'rose',
  },
  {
    id: 'hospital-assets',
    title: 'Hospital Network Asset Management System',
    year: '2025–26',
    sector: 'Healthcare',
    roleLabel: 'Product Owner',
    roles: ['po'],
    description:
      'Brought in to rescue an at-risk project: renegotiated scope with stakeholders and turned a heavy projected loss into a positive margin, while scoping maintenance, repair, borrow/return and depreciation modules.',
    tags: ['Project rescue', 'Scope', 'Vendor management'],
    tone: 'fog',
  },
  {
    id: 'agri-monitoring',
    title: 'Agricultural Environmental Monitoring Dashboard',
    year: '2025',
    sector: 'Government',
    roleLabel: 'Product Owner',
    roles: ['po'],
    description:
      'Product Owner for a satellite-based dashboard supporting agricultural policy; caught a man-day shortfall mid-project, reprioritized and negotiated non-essential items out of scope, and closed within budget.',
    tags: ['Dashboard', 'SRS / SDS', 'Budget control'],
    tone: 'mint',
  },
  {
    id: 'fund-instructions',
    title: 'Fund Management Instruction System',
    year: '2024–25',
    sector: 'Finance',
    roleLabel: 'BA · Tech Lead',
    roles: ['ba', 'techlead'],
    description:
      'Filled a critical BA gap on the instruction module, gathering requirements and mapping the business flow for subscription, redemption, transfer and fees, then led three vendor and two in-house developers to go-live on schedule.',
    tags: ['Requirements', 'Business flow', 'Team lead'],
    tone: 'butter',
  },
  {
    id: 'welfare-finance',
    title: 'Government Welfare & Finance System',
    year: '2024',
    sector: 'Government',
    roleLabel: 'Frontend Developer',
    roles: ['dev'],
    description:
      'One of only two React developers on a largely Angular team; built UI, integrated APIs and took on the most complex tasks to help meet the contractual deadline.',
    tags: ['React.js', 'API integration'],
    tone: 'ice',
  },
  {
    id: 'joomla-redesign',
    title: 'Government Website Redesign on Joomla',
    year: '2023',
    sector: 'Government',
    roleLabel: 'Developer',
    roles: ['dev'],
    description:
      'Led development as the only CMS-experienced member: research, proofs of concept, plugin choices and UI, plus a custom webhook connecting a chatbot to the OpenAI API.',
    tags: ['Joomla', 'OpenAI webhook'],
    tone: 'lilac',
  },
];
