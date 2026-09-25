export type InterviewLens = 'all' | 'recruiter' | 'tech-lead' | 'bms-systems';

export type ProjectCategory = 'all' | 'fullstack' | 'ai-ml' | 'systems-db';

export interface EducationItem {
  degree: string;
  institution: string;
  score: string;
  period: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  context: string;
  date: string;
  iconType: 'trophy' | 'certificate' | 'award';
}

export interface StarMethod {
  situation: string;
  task: string;
  action: string[];
  result: string;
  metrics: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  category: 'fullstack' | 'ai-ml' | 'systems-db';
  headlineMetric: string;
  metricLabel: string;
  techStack: string[];
  period: string;
  liveUrl?: string;
  githubUrl?: string;
  shortDescription: string;
  star: StarMethod;
  tradeoffs: {
    chosen: string;
    alternative: string;
    rationale: string;
  }[];
  type: 'ecommerce' | 'deepfake' | 'tourism' | 'bms';
}

export interface WorkExperience {
  company: string;
  contractContext?: string;
  role: string;
  period: string;
  location: string;
  type: string;
  headlineMetric: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  interviewNote: string;
}

export interface BMSMetric {
  id: string;
  system: string;
  status: 'normal' | 'warning' | 'optimal';
  metric: string;
  reading: string;
  description: string;
}
