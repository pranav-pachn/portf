import { ExperienceItem } from '../types/experience';

export const experience: ExperienceItem[] = [
  {
    id: 'pragament',
    title: 'SOFTWARE DEVELOPMENT INTERN',
    organization: 'Pragament Tech Solutions',
    dateRange: '2025 — 2026',
    description: 'Built production web applications across React, Flask and Python, contributing to frontend features, APIs and debugging.',
    techStack: ['React', 'Flask', 'Python', 'REST APIs', 'Git'],
    logo: '/projects/pragamant.webp',
    invertLogo: true,
    type: 'work',
  },
  {
    id: 'swecha',
    title: 'AI DEVELOPER',
    organization: 'Swecha Telangana',
    dateRange: 'Jun 2025 — Jul 2025',
    description: 'Explored AI and ML fundamentals, building conversational AI models and experimenting with generative AI workflows for real-world use cases.',
    techStack: ['AI', 'Generative AI', 'ML', 'Python'],
    logo: '/projects/swecha.png',
    invertLogo: false,
    type: 'work',
  },
  {
    id: 'opensource',
    title: 'OPEN SOURCE CONTRIBUTOR',
    organization: 'GirlScript Summer of Code',
    dateRange: '2025 / 2026',
    description: 'Contributed to open-source projects through issue resolution, feature implementation and pull requests across modern web stacks.',
    badge: 'TOP 10%',
    highlight: 'Nexus Spring of Code',
    type: 'opensource',
  },
];
