import { FeaturedProject } from '../types/project';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'jobshield-ai',
    title: 'JobShield AI',
    tagline: 'AI-powered recruiter fraud detection platform with explainable risk scoring',
    problem: 'Job seekers face fraudulent recruiter outreach with no reliable way to verify legitimacy before engaging.',
    solution: 'Multi-layer verification engine combining domain analysis, heuristic pattern matching, NLP scoring, and risk aggregation into an explainable fraud report.',
    stack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'TensorFlow', 'NLP', 'Explainable AI'],
    architectureDecisions: [
      'Separated heuristic and ML scoring into independent layers so each could be tested and explained individually.',
      'Chose FastAPI for inference latency.',
      'Built explainability into the output layer rather than bolting it on.'
    ],
    engineeringChallenge: 'Balancing NLP model accuracy against response time — solved by running heuristic pre-filters to reduce inference load.',
    iteration: 'Initially used a single monolithic scoring function; refactored into a pipeline with discrete verification stages after the first version produced opaque risk scores.',
    learned: 'Explainability is a product feature, not a debugging tool — users trust systems they can understand.',
    liveUrl: null,
    githubUrl: 'https://github.com/pranav-pachn/JobShield-AI',
    image: '/projects/jobshield.png',
    accentColor: 'hsl(210, 80%, 55%)'
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360',
    tagline: 'AI-driven agricultural advisory platform with crop disease diagnosis and multilingual guidance',
    problem: 'Farmers in multilingual regions lack accessible, real-time crop disease identification and actionable treatment guidance.',
    solution: 'Image-based crop analysis pipeline using FastAPI inference, Grad-CAM explainability overlays, and multilingual recommendation engine.',
    stack: ['React', 'FastAPI', 'TensorFlow', 'Grad-CAM', 'MongoDB', 'Multilingual NLP'],
    architectureDecisions: [
      'Built inference as a stateless FastAPI service for horizontal scaling.',
      'Chose Grad-CAM to give farmers visual proof of which leaf regions triggered the diagnosis.',
      'Separated recommendation engine from diagnosis to allow independent updates.'
    ],
    engineeringChallenge: 'Achieving real-time inference on low-resolution mobile uploads while maintaining diagnostic accuracy — solved via server-side preprocessing normalization.',
    iteration: 'First version returned raw classification labels; iterated to include Grad-CAM heatmaps and localized treatment recommendations after user testing showed farmers needed visual confirmation.',
    learned: 'AI UX for non-technical users requires visual proof, not just confidence scores — Grad-CAM overlays were more persuasive than numerical outputs.',
    liveUrl: null,
    githubUrl: 'https://github.com/pranav-pachn/AgriMitra360',
    image: '/projects/agrimitra.png',
    accentColor: 'hsl(142, 60%, 45%)'
  },
  {
    id: 'modernmart',
    title: 'ModernMart',
    tagline: 'Full-featured e-commerce platform with auth flows, admin dashboards, and CI-backed quality',
    problem: 'Most student e-commerce projects lack real production patterns — no auth, no admin workflows, no testing, no CI.',
    solution: 'End-to-end e-commerce application with Supabase authentication, role-based admin panel, comprehensive test suite, and CI pipeline.',
    stack: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Node.js', 'Tailwind CSS', 'Jest', 'CI/CD'],
    architectureDecisions: [
      'Chose Supabase for auth + real-time DB to reduce backend surface area.',
      'Separated admin and customer routes at the layout level.',
      'Built test suite covering auth flows and cart operations before adding features.'
    ],
    engineeringChallenge: 'Managing optimistic UI updates for cart operations while keeping Supabase state consistent — solved with a custom sync hook that reconciles local and server state.',
    iteration: 'Originally built without tests; added comprehensive test coverage after a deployment broke the checkout flow — shifted to test-first for all subsequent features.',
    learned: 'Testing is a deployment prerequisite, not a nice-to-have; CI caught three breaking changes that manual QA missed.',
    liveUrl: null,
    githubUrl: 'https://github.com/pranav-pachn/ModernMart',
    image: '/projects/modernmart.png',
    accentColor: 'hsl(270, 60%, 55%)'
  }
];
