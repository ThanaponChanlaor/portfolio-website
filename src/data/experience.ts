import type { Experience } from '../types';

export const experience: Experience = {
  company: 'Sirisoft',
  headline: 'Career progression',
  period: 'June 2023 – July 2026',
  stages: [
    {
      title: 'Software Developer',
      period: 'Jun 2023 – Dec 2024',
      summary:
        'Built React UIs on a government welfare system and a Joomla government site with an OpenAI chatbot webhook, then filled a BA gap on a fund management module and led its mixed vendor and in-house team.',
      tone: 'ice',
    },
    {
      title: 'Business Technology Consultant',
      period: 'Jan 2025 – Dec 2025',
      summary:
        'Product Owner on a hospital asset system and an agricultural dashboard: renegotiated scope, controlled man-days and reviewed vendor deliverables before handover.',
      tone: 'butter',
    },
    {
      title: 'Business Technology Consultant Senior Officer',
      period: 'Jan 2026 – Jul 2026',
      summary:
        "Tech Lead on two platforms won at presale: owned delivery and man-days, covered BA duties, reviewed code and was the client's single point of contact.",
      tone: 'peach',
    },
  ],
};
