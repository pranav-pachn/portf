export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  description?: string;
  type: 'education' | 'certification' | 'work';
}
