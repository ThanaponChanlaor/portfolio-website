export type Tone = 'white' | 'peach' | 'lilac' | 'ice' | 'mint' | 'fog' | 'butter' | 'rose';

export interface NavLink {
  label: string;
  href: string;
}

export interface Profile {
  initials: string;
  firstName: string;
  lastName: string;
  applyingFor: string;
  intro: string;
  location: string;
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  cvUrl: string;
  /** Name the browser saves the CV as. */
  cvFileName: string;
}

export interface RoleStep {
  step: number;
  title: string;
  /** What the job post asks for. */
  requirement: string;
  /** Evidence from past work that meets it. */
  evidence: string;
  tone: Tone;
}

export interface ExperienceStage {
  title: string;
  period: string;
  summary: string;
  tone: Tone;
}

export interface Experience {
  company: string;
  headline: string;
  period: string;
  stages: ExperienceStage[];
}

export type ProjectRole = 'dev' | 'techlead' | 'ba' | 'po';

export interface Project {
  id: string;
  title: string;
  year: string;
  sector: string;
  roleLabel: string;
  roles: ProjectRole[];
  description: string;
  tags: string[];
  tone: Tone;
}

export interface SkillGroup {
  title: string;
  skills: string[];
  tone: Tone;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ClientType {
  id: string;
  label: string;
}

export interface StackItem {
  layer: string;
  title: string;
  description: string;
  tone: Tone;
}
