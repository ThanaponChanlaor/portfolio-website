import type { ClientType } from '../types';

/** Client sectors from the projects, shown as the labelled buildings on the hero map. */
export const clientTypes: ClientType[] = [
  { id: 'revenue', label: 'Government · Revenue & Taxation' },
  { id: 'financial', label: 'Financial' },
  { id: 'geospatial', label: 'Government · Geospatial' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'welfare', label: 'Government · Social Welfare' },
  { id: 'agriculture', label: 'Government · Agriculture' },
];
