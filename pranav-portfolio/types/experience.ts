export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  description?: string;
  techStack?: string[];
  outcomes?: string[];
  logo?: string;
  invertLogo?: boolean;
  type: 'education' | 'certification' | 'work';
}
