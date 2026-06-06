import { StackLayer } from '../types/stack';

export const stack: StackLayer[] = [
  {
    name: 'Frontend Layer',
    description: 'Polished interfaces and interactive experiences',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    name: 'Backend Layer',
    description: 'Scalable services and APIs',
    technologies: ['Node.js', 'Express.js', 'FastAPI'],
  },
  {
    name: 'AI Layer',
    description: 'Inference, NLP, and explainability',
    technologies: ['TensorFlow', 'TensorFlow.js', 'NLP', 'Explainable AI (Grad-CAM)'],
  },
  {
    name: 'Data Layer',
    description: 'Persistent state and real-time sync',
    technologies: ['MongoDB', 'Supabase', 'PostgreSQL'],
  },
  {
    name: 'Delivery Layer',
    description: 'Testing, CI, and deployment workflows',
    technologies: ['Git', 'Docker', 'Postman', 'Vercel', 'AWS Foundations'],
  },
];
