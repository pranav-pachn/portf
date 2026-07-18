import { ExperienceItem } from '../types/experience';

export const experience: ExperienceItem[] = [
  {
    id: 'pragament',
    title: 'Software Development Intern',
    organization: 'PRAGAMENT TECH SOLUTIONS PRIVATE LIMITED',
    dateRange: '01-07-2026 to 01-10-2026',
    description: 'Contributed to the development and maintenance of production web applications by building responsive React interfaces, implementing Flask-based backend services, integrating REST APIs, and troubleshooting production issues. Collaborated with cross-functional teams using Git workflows while gaining hands-on experience in modern full-stack software development.',
    techStack: ['React', 'Python', 'Flask', 'REST APIs', 'Git'],
    outcomes: [
      'Full-stack feature development',
      'Production debugging',
      'API integration',
      'Team collaboration',
    ],
    logo: '/projects/pragamant.webp',
    invertLogo: true,
    type: 'work',
  },
  {
    id: 'btech',
    title: 'B.Tech in Computer Science and Engineering',
    organization: 'B V Raju Institute of Technology',
    dateRange: '2024 – 2028',
    description: 'Developed foundational systems thinking, transitioning from basic programming to architecting full-stack web applications and AI pipelines. GPA 8.29.',
    type: 'education',
  },
  {
    id: 'aws',
    title: 'AWS Foundations',
    organization: 'Amazon Web Services',
    dateRange: '2024',
    description: 'Gained practical understanding of cloud deployment, enabling me to architect scalable service boundaries and reliable infrastructure.',
    type: 'certification',
  },
  {
    id: 'vishwam',
    title: 'AI Intern',
    organization: 'Vishwam AI',
    dateRange: '2024',
    description: 'Transitioned from textbook ML to production ML workflows, learning how to build and optimize inference pipelines for real-world reliability.',
    type: 'work',
  },
  {
    id: 'aicte',
    title: 'AICTE Internship — AI & Cloud',
    organization: 'AICTE',
    dateRange: '2024',
    description: 'Bridged the gap between local AI models and cloud deployment, applying industry-focused engineering practices to real-world applications.',
    type: 'work',
  },
];
