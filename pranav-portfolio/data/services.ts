import { ServiceCategory } from '../types/service';

export const services: ServiceCategory[] = [
  {
    name: 'Full-Stack Engineering',
    description: 'Build complete web products from responsive frontend interfaces to backend APIs, auth flows, and production-ready data systems.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'FastAPI'],
    capabilityLines: [
      ['React', 'Node.js', 'Express.js', 'MongoDB'],
      ['REST APIs', 'Firebase', 'MySQL', 'Docker'],
      ['Git', 'GitHub', 'Postman', 'Vercel']
    ],
    icon: 'Layers',
    projectLinks: [
      { label: 'View ModernMart', href: '/work/modernmart' },
      { label: 'View JobShield AI', href: '/work/jobshield-ai' }
    ]
  },
  {
    name: 'Frontend Systems & UI',
    description: 'Design and develop responsive interfaces with strong hierarchy, accessibility, motion, and component consistency across devices.',
    technologies: ['Tailwind CSS', 'Framer Motion', 'React Context', 'Zustand', 'CSS Modules'],
    capabilityLines: [
      ['Tailwind CSS', 'Framer Motion', 'CSS Modules'],
      ['React Context', 'Zustand', 'Component Systems'],
      ['Responsive Design', 'Accessibility', 'Motion']
    ],
    icon: 'Layout',
    projectLinks: [
      { label: 'View ModernMart', href: '/work/modernmart' },
      { label: 'View AgriMitra360', href: '/work/agrimitra360' }
    ]
  },
  {
    name: 'AI Systems & Applied ML',
    description: 'Build AI-enabled product workflows using inference services, NLP pipelines, computer vision, and explainability layers that integrate into real user flows.',
    technologies: ['TensorFlow', 'NLP', 'Computer Vision', 'Grad-CAM', 'Python'],
    capabilityLines: [
      ['TensorFlow', 'NLP', 'Computer Vision'],
      ['Grad-CAM', 'Explainable AI', 'Python'],
      ['FastAPI Inference', 'Model Pipelines']
    ],
    icon: 'Brain',
    projectLinks: [
      { label: 'View JobShield AI', href: '/work/jobshield-ai' },
      { label: 'View AgriMitra360', href: '/work/agrimitra360' }
    ]
  },
  {
    name: 'Optimization & Engineering Foundations',
    description: 'Improve reliability, performance, and maintainability through structured APIs, scalable data handling, debugging discipline, and strong CS fundamentals.',
    technologies: ['System Design', 'CI/CD', 'Jest', 'API Design', 'Performance Auditing'],
    capabilityLines: [
      ['System Design', 'CI/CD', 'Jest'],
      ['API Design', 'Performance Auditing'],
      ['Data Structures', 'Algorithms', 'Debugging']
    ],
    icon: 'Zap',
    projectLinks: [
      { label: 'View ModernMart', href: '/work/modernmart' },
      { label: 'View JobShield AI', href: '/work/jobshield-ai' }
    ]
  }
];
