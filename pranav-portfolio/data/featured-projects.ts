import { FeaturedProject } from '../types/project';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'jobshield-ai',
    title: 'JobShield AI',
    category: 'AI / Security',
    year: '2025',
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
    motivation: 'Built to solve a personal frustration — encountering fraudulent recruiter outreach with no reliable way to verify legitimacy before engaging.',
    nextImprovement: 'Add browser extension for inline verification and expand the training corpus with crowd-sourced labeled data.',
    liveUrl: 'https://jobshield-ai-taupe.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/JobShield-AI',
    image: '/projects/jobshield.png',
    accentColor: 'hsl(210, 80%, 55%)',
    caseStudy: {
      overview: 'JobShield AI is a multi-layer fraud detection platform that combines domain analysis, heuristic scoring, and NLP to protect job seekers from sophisticated recruitment scams.',
      problemContext: 'The modern job search landscape is plagued by sophisticated recruitment scams. Fraudsters create convincing replica domains, spoof legitimate recruiting agencies, and use social engineering to extract personal information or advance fees from desperate job seekers.\n\nExisting solutions either rely on static blacklists (which are easily bypassed by new domains) or opaque AI models that simply output a binary "safe/unsafe" score without explaining why. Job seekers need a way to verify outreach legitimacy in real-time, with clear explanations of what exactly is suspicious about a given message or sender.',
      systemDesignSteps: [
        { id: 'input', label: 'Input Processing', caption: 'Email/Message Text', icon: 'Mail' },
        { id: 'domain', label: 'Domain Verification', caption: 'DNS & SSL Checks', icon: 'Globe' },
        { id: 'heuristics', label: 'Heuristic Scoring', caption: 'Pattern Matching', icon: 'Code' },
        { id: 'nlp', label: 'NLP Analysis', caption: 'Intent & Urgency', icon: 'Brain' },
        { id: 'aggregation', label: 'Risk Aggregation', caption: 'Weighted Scoring', icon: 'Layers' },
        { id: 'report', label: 'Explainable Report', caption: 'User Dashboard', icon: 'FileText' }
      ],
      screenshots: [
        { src: '/projects/jobshield.png', alt: 'JobShield AI Dashboard', caption: 'The main risk assessment dashboard showing aggregated scores.' }
      ]
    }
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360',
    category: 'AI / AgriTech',
    year: '2025–2026',
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
    motivation: 'Wanted to apply AI to a real accessibility gap — farmers in multilingual regions who need actionable crop advice, not just classification labels.',
    nextImprovement: 'Add offline inference via TensorFlow Lite for areas with unreliable connectivity.',
    liveUrl: 'https://agri-360.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/AgriMitra360',
    image: '/projects/agrimitra.png',
    accentColor: 'hsl(142, 60%, 45%)',
    caseStudy: {
      overview: 'AgriMitra360 is an intelligent crop disease diagnosis platform tailored for multilingual agricultural communities, delivering real-time actionable insights with visual explainability.',
      problemContext: 'In many developing agricultural regions, farmers face devastating crop losses due to delayed disease identification. Access to agricultural experts is limited, and existing digital tools often rely on text-heavy interfaces in a single language.\n\nFurthermore, when farmers use AI tools that simply return a text diagnosis ("Late Blight: 89%"), they often distrust the result. They need to see exactly why the AI made that decision and what immediate, localized steps they should take in their native language.',
      systemDesignSteps: [
        { id: 'image', label: 'Crop Image', caption: 'Mobile Upload', icon: 'Camera' },
        { id: 'api', label: 'FastAPI Service', caption: 'Preprocessing', icon: 'Server' },
        { id: 'model', label: 'Diagnosis Model', caption: 'TensorFlow CNN', icon: 'Cpu' },
        { id: 'explain', label: 'Grad-CAM', caption: 'Heatmap Overlay', icon: 'Eye' },
        { id: 'recommend', label: 'Recommendations', caption: 'Multilingual NLP', icon: 'Languages' }
      ],
      screenshots: [
        { src: '/projects/agrimitra.png', alt: 'AgriMitra360 Dashboard', caption: 'The disease diagnosis view featuring Grad-CAM heatmap overlays.' }
      ]
    }
  },
  {
    id: 'modernmart',
    title: 'ModernMart',
    category: 'E-Commerce',
    year: '2026',
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
    motivation: 'Most student e-commerce projects skip auth, testing, and CI — built this to prove production-grade patterns at the student project level.',
    nextImprovement: 'Add real-time inventory sync and implement Stripe payment integration with webhook handling.',
    liveUrl: 'https://modern-mart-gamma.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/ModernMart',
    image: '/projects/modernmart.png',
    accentColor: 'hsl(270, 60%, 55%)',
    caseStudy: {
      overview: 'ModernMart is a production-ready e-commerce platform that emphasizes robust software engineering practices, including authentication, comprehensive testing, and CI/CD pipelines.',
      problemContext: 'Many portfolio e-commerce projects focus solely on frontend visuals—displaying a grid of products and a cart—while ignoring the complex realities of building a real store.\n\nWithout authentication, role-based access control, reliable database syncing, and automated testing, a store cannot scale or be maintained. The challenge was to build an application that not only looked good but incorporated the strict engineering standards expected in industry.',
      systemDesignSteps: [
        { id: 'client', label: 'Next.js Client', caption: 'Optimistic UI', icon: 'Monitor' },
        { id: 'auth', label: 'Supabase Auth', caption: 'JWT & Roles', icon: 'Key' },
        { id: 'db', label: 'PostgreSQL', caption: 'Products & Orders', icon: 'Database' },
        { id: 'sync', label: 'State Sync', caption: 'Custom Hook', icon: 'RefreshCw' },
        { id: 'ci', label: 'CI Pipeline', caption: 'Jest Tests', icon: 'Workflow' }
      ],
      screenshots: [
        { src: '/projects/modernmart.png', alt: 'ModernMart Storefront', caption: 'The main storefront showcasing state-synced cart operations.' }
      ]
    }
  },
  {
    id: 'citysketch',
    title: 'CitySketch',
    category: 'Urban Tech / AI',
    year: '2026',
    tagline: 'AI-powered smart city layout generator with 2D/3D visualization and real-world constraints',
    problem: 'Urban planning prototyping requires specialized tools — most students and researchers lack accessible ways to generate and evaluate city layouts from simple descriptions.',
    solution: 'Natural-language-driven layout engine using React + Three.js that generates scored 2D/3D city plans constrained by real-world geographic data via Geoapify and Overpass API.',
    stack: ['React', 'Three.js', 'TypeScript', 'Geoapify', 'Overpass API'],
    architectureDecisions: [],
    engineeringChallenge: 'Translating natural language into valid zoning coordinates over real-world maps.',
    iteration: '',
    learned: '',
    liveUrl: 'https://city-sketch.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/citySketch',
    image: '/projects/citysketch.png',
    accentColor: 'hsl(45, 80%, 50%)'
  },
  {
    id: 'misinfo-analyzer',
    title: 'Misinfo Analyzer',
    category: 'AI / Trust & Safety',
    year: '2026',
    tagline: 'Explainable AI platform for real-time misinformation detection in text and news URLs',
    problem: 'Users encounter misinformation daily but lack accessible, transparent tools to verify claims — most AI detectors are black boxes.',
    solution: 'Full-stack analysis platform combining NLP classification with explainability layers, supporting both raw text and live URL verification with transparent confidence scoring.',
    stack: ['React', 'Python', 'NLP', 'Explainable AI', 'FastAPI'],
    architectureDecisions: [],
    engineeringChallenge: 'Real-time text extraction and inference on live news URLs without blocking the main thread.',
    iteration: '',
    learned: '',
    liveUrl: 'https://ai-powered-misinformation-analysis.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/AI-Powered-Misinformation-Analysis-Platform',
    image: '/projects/misinfo.png',
    accentColor: 'hsl(0, 70%, 55%)'
  }
];
