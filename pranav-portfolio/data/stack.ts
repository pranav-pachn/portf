import { StackLayer } from '../types/stack';

export const stack: StackLayer[] = [
  {
    name: 'Frontend Layer',
    description: 'Polished interfaces and interactive experiences',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: 'Monitor',
  },
  {
    name: 'Backend Layer',
    description: 'Scalable services and APIs',
    technologies: ['Node.js', 'Express.js', 'FastAPI'],
    icon: 'Server',
  },
  {
    name: 'AI Layer',
    description: 'Inference, NLP, and explainability',
    technologies: ['TensorFlow', 'NLP', 'Explainable AI'],
    icon: 'BrainCircuit',
  },
  {
    name: 'Data Layer',
    description: 'Persistent state and real-time sync',
    technologies: ['MongoDB', 'Supabase', 'SQL'],
    icon: 'Database',
  },
  {
    name: 'Delivery Layer',
    description: 'Testing, CI, and deployment workflows',
    technologies: ['Git', 'Docker', 'Postman'],
    icon: 'Rocket',
  },
];
