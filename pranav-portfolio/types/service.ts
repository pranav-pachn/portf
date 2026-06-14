export interface ServiceCategory {
  name: string;
  description: string;
  technologies: string[];
  capabilityLines?: string[][]; // 3 arrays of grouped capabilities
  icon: string; // Lucide icon name
  projectLinks?: { label: string; href: string }[];
}
