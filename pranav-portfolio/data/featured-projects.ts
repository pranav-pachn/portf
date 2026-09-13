import { FeaturedProject } from '../types/project';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'specforge',
    title: 'SpecForge',
    category: 'AI Engineering Platform',
    year: '2026',
    tagline: 'AI engineering workspace that converts product ideas into structured specifications, development tasks, and implementation plans.',
    problem: 'Teams struggle to translate ideas into actionable engineering plans without losing context or introducing ambiguity.',
    solution: 'An AI-driven platform that orchestrates multi-agent LLM workflows to generate structured product requirements, database schemas, task breakdowns, and execution plans from natural language — keeping every artifact consistent with the original intent.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Vercel AI SDK', 'NextAuth', 'Tailwind CSS', 'OpenAI', 'BullMQ'],
    architectureDecisions: [
      'Separated the AI orchestration layer (Workflow Engine) from the API and UI layers so model providers can be swapped without touching the frontend.',
      'Used Server-Sent Events (SSE) for streaming pipeline updates to the client — giving real-time visibility into multi-step generation without long-polling.',
      'Introduced a Runtime Coordinator with BullMQ job queues for background task scheduling, enabling resume-on-failure for long-running workflows.',
      'Artifact versioning is handled by a dedicated Artifact Manager persisted to PostgreSQL — ensuring every generated spec, plan, and task set is versioned and auditable.'
    ],
    engineeringChallenge: 'Managing state and context across multiple sequential LLM steps without timeouts or context loss — solved by breaking each workflow into discrete checkpointed stages with the Runtime Coordinator, allowing partial results to be saved and resumed.',
    iteration: 'Iterated from a single-prompt approach to a multi-agent orchestration pipeline with discrete stages: spec generation, implementation planning, task breakdown, code scaffold, and drift detection.',
    learned: 'Breaking down AI tasks into discrete, verifiable steps with checkpointing yields significantly better and more consistent engineering outputs than single large prompts.',
    liveUrl: 'https://specforge.app',
    githubUrl: null,
    image: '/projects/specforge.png',
    accentColor: 'hsl(240, 80%, 60%)',
    engineeringFocus: [
      { label: 'AI Systems', stars: 5 },
      { label: 'Architecture', stars: 5 },
      { label: 'Product Design', stars: 5 },
      { label: 'Backend', stars: 4 },
      { label: 'Frontend', stars: 4 }
    ],
    keyDecision: 'Decoupled AI orchestration from the UI layer to isolate model providers and enable resumable multi-agent execution.',
    caseStudy: {
      overview: 'SpecForge turns unstructured ideas into structured software specifications, implementation plans, and execution-ready task breakdowns — using a multi-agent AI pipeline where each stage is checkpointed, versioned, and streamed live to the client.',
      problemContext: 'The gap between a product idea and the first line of production code is where most projects fail. Engineering teams waste days clarifying requirements, architects redraw diagrams after scope changes, and developers start building before anyone agrees on what "done" looks like.\n\nExisting tools force teams to choose between heavy specification documents that nobody reads, or lightweight tickets that carry too little context to guide implementation. SpecForge bridges this gap by automatically generating structured specs, system designs, task breakdowns, and code scaffolds from natural language — using a multi-agent orchestration pipeline where every artifact stays consistent with the original intent.',
      systemDesignSteps: [
        { id: 'input', label: 'Product Idea', caption: 'Natural Language Input', icon: 'Lightbulb', reason: 'Accepts raw, unstructured intent — no templates or forms required.' },
        { id: 'workflow', label: 'Workflow Engine', caption: 'Pipeline Orchestration', icon: 'Workflow', reason: 'Orchestrates the multi-step pipeline; each stage is discrete and independently resumable.' },
        { id: 'agents', label: 'AI Agents', caption: 'Spec · Plan · Tasks · Code', icon: 'Bot', reason: 'Specialized agents handle each artifact type, preventing context bleed between stages.' },
        { id: 'runtime', label: 'Runtime Coordinator', caption: 'State & Checkpoints (Redis)', icon: 'Cpu', reason: 'Checkpoints partial progress so long-running workflows survive timeouts or failures.' },
        { id: 'artifacts', label: 'Artifact Manager', caption: 'Versioned Outputs', icon: 'FileText', reason: 'Every generated spec, plan, and task set is versioned — enabling drift detection over time.' },
        { id: 'db', label: 'PostgreSQL + Redis', caption: 'Persistence & Job Queue', icon: 'Database', reason: 'PostgreSQL for durable artifact storage; Redis for BullMQ job scheduling and state cache.' }
      ],
      screenshots: [
        { src: '/projects/specforge.png', alt: 'SpecForge Workspace', caption: 'The workflow dashboard showing a live specification generation pipeline with streaming SSE updates.' }
      ]
    }
  },
  {
    id: 'temporalrent',
    title: 'TemporalRent',
    category: 'Inventory & Booking Platform',
    year: '2026',
    tagline: 'Conflict-free inventory reservation platform for event rental businesses — know what you can safely promise before you promise it.',
    problem: 'Event rental businesses use spreadsheets to track packages, but packages are abstractions over physical items. Two bookings for different packages can silently contest the same physical inventory, making overbooking inevitable.',
    solution: 'A temporal inventory engine that expands package Bill of Materials into physical item demand, computes quantity-aware availability across buffer-padded time windows, and confirms reservations inside ACID transactions with deterministic row-level locking.',
    stack: ['Next.js 14', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Turborepo', 'pnpm', 'Zod', 'JWT', 'Helmet'],
    architectureDecisions: [
      'Used PostgreSQL tstzrange range types and GiST indexes for all temporal overlap checks — moving correctness into the database engine where ACID guarantees apply.',
      'Deterministic lock ordering (sorted inventory item ID) eliminates deadlocks during concurrent booking confirmation transactions.',
      'Package versions are immutable once published — past bookings remain historically accurate even when package components are edited.',
      'Idempotency keys on confirmation endpoints allow safe network retries without double-allocating inventory.'
    ],
    engineeringChallenge: 'Preventing race conditions during concurrent booking confirmations — two simultaneous requests for the same inventory window must not both succeed. Solved with ACID transactions, in-transaction re-verification under row-level locks, and deterministic sorted lock ordering.',
    iteration: 'Initially modelled availability as a simple calendar slot check. Iterated to BOM expansion plus quantity-pool math plus temporal buffer resolution after discovering that two bookings for different packages could share physical items.',
    learned: 'Temporal modelling at the database layer (tstzrange + GiST) is orders of magnitude simpler and more reliable than replicating the same logic in application code. The database is the single source of truth for time.',
    motivation: 'Observed real event rental businesses losing money from accidental double-bookings caused by spreadsheet-based inventory tracking with no physical demand aggregation.',
    liveUrl: null,
    githubUrl: 'https://github.com/pranav-pachn/TemporalRent',
    image: '/projects/temporalrent.png',
    accentColor: 'hsl(30, 80%, 55%)',
    engineeringFocus: [
      { label: 'System Design', stars: 5 },
      { label: 'Database Engineering', stars: 5 },
      { label: 'Backend', stars: 5 },
      { label: 'API Design', stars: 4 }
    ],
    keyDecision: 'Moved temporal correctness into PostgreSQL using tstzrange + GiST indexes, eliminating application-level availability race conditions.',
    caseStudy: {
      overview: 'TemporalRent is a temporal inventory reservation engine for event rental businesses. It expands package Bill of Materials into physical item demand, computes buffer-aware time windows, and confirms bookings inside ACID transactions — guaranteeing conflict-free reservations at scale.',
      problemContext: 'Event rental businesses frequently promise inventory based on package names — "Premium Haldi Setup x 1" — using spreadsheets or calendar entries. But a package is not a physical item. It is an abstraction that expands into 6-10 individual physical components, each with its own stock pool.\n\nTwo bookings for completely different packages may silently contest the exact same shared physical inventory. Without physical demand aggregation and temporal buffer awareness — accounting for prep, transit, event runtime, teardown, and cleaning — overbooking is inevitable.\n\nWhen a conflict is detected, TemporalRent returns actionable diagnostics: which items are short, by how many units, and which existing bookings are responsible — so the business can act rather than guess.',
      systemDesignSteps: [
        { id: 'booking', label: 'Booking Request', caption: 'Package + Item Selection', icon: 'ShoppingCart', reason: 'Accepts packages or individual items; both are normalized into the same demand pipeline.' },
        { id: 'bom', label: 'BOM Expansion', caption: 'Package → Physical Items', icon: 'GitBranch', reason: 'Expands package abstractions into concrete physical item quantities before any availability check.' },
        { id: 'buffer', label: 'Buffer Resolution', caption: 'Prep + Transit + Cleanup', icon: 'Clock', reason: 'Widens the effective time window by adding logistical buffers — prevents conflicts from staging overlap.' },
        { id: 'check', label: 'Availability Check', caption: 'tstzrange Overlap Query', icon: 'Search', reason: 'PostgreSQL GiST-indexed range queries detect all overlapping committed demand in a single query.' },
        { id: 'lock', label: 'ACID Transaction', caption: 'Row Locks + Re-verify', icon: 'Lock', reason: 'Deterministic lock ordering prevents deadlocks; in-transaction re-check prevents TOCTOU race conditions.' },
        { id: 'confirm', label: 'Reservation', caption: 'Audit + State Machine', icon: 'CheckCircle', reason: 'Transitions booking through a typed state machine and writes an immutable audit event.' }
      ],
      screenshots: []
    }
  },
  {
    id: 'jobshield-ai',
    title: 'JobShield AI',
    category: 'AI Security Platform',
    year: '2025',
    tagline: 'Analyzes job postings and recruiter information to identify potential recruitment scams using heuristics and AI-assisted risk scoring.',
    problem: 'Job seekers face fraudulent recruiter outreach with no reliable way to verify legitimacy before engaging.',
    solution: 'Multi-layer verification engine combining domain analysis, heuristic pattern matching, NLP scoring, and risk aggregation into an explainable fraud report.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'PyTorch', 'Hugging Face Transformers', 'MongoDB Atlas', 'JWT'],
    architectureDecisions: [
      'Separated heuristic and ML scoring into independent layers so each could be tested and explained individually.',
      'Parallelized all three signals (AI, recruiter trust, threat intel) with Promise.all — reducing p99 latency by ~60% vs serial calls.',
      'Built explainability into the output layer natively rather than bolting it on — every verdict includes per-signal breakdowns.',
      'NLP models are only invoked for ambiguous score ranges (0.2-0.8) — clear scams and legitimate posts bypass model inference, reducing costs by ~70%.'
    ],
    engineeringChallenge: 'Balancing NLP model accuracy against response time — solved by running heuristic pre-filters to reduce inference load. Only ambiguous cases hit the full DistilBERT + zero-shot pipeline.',
    iteration: 'Initially used a single monolithic scoring function; refactored into a pipeline with discrete verification stages after the first version produced opaque risk scores that users could not understand or trust.',
    learned: 'Explainability is a product feature, not a debugging tool — users trust systems they can understand. A confidence score without evidence is just another black box.',
    motivation: 'Built to solve a personal frustration — encountering fraudulent recruiter outreach with no reliable way to verify legitimacy before engaging.',
    nextImprovement: 'Add browser extension for inline verification and expand the training corpus with crowd-sourced labeled data.',
    liveUrl: 'https://jobshield-ai-taupe.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/JobShield-AI',
    image: '/projects/jobshield.png',
    accentColor: 'hsl(210, 80%, 55%)',
    engineeringFocus: [
      { label: 'Machine Learning', stars: 5 },
      { label: 'Security', stars: 5 },
      { label: 'Backend', stars: 4 },
      { label: 'System Design', stars: 4 }
    ],
    keyDecision: 'Built native explainability directly into the multi-signal risk pipeline so users understand the evidence behind every fraud verdict.',
    caseStudy: {
      overview: 'JobShield AI helps job seekers verify recruiter outreach and identify recruitment scams by fusing three independent signals — NLP analysis, recruiter domain trust, and cross-referenced threat intelligence — into a single weighted, explainable verdict.',
      problemContext: 'The modern job search landscape is plagued by sophisticated recruitment scams. Fraudsters create convincing replica domains, spoof legitimate recruiting agencies, and use social engineering to extract personal information or advance fees from desperate job seekers.\n\nExisting solutions either rely on static blacklists — easily bypassed by new domains — or opaque AI models that simply output a binary safe/unsafe score without explaining why. Job seekers need a way to verify outreach legitimacy in real-time, with clear explanations of what exactly is suspicious.\n\nJobShield AI addresses this with a parallel three-signal architecture: AI pipeline (rules to heuristics to NLP), recruiter domain trust (WHOIS, SSL, VirusTotal), and threat intelligence (MongoDB cross-reference). Final Risk = (AI Score x 0.5) + (Recruiter Score x 0.25) + (Threat Intel x 0.25). When signals agree, confidence is high; when they disagree, the system surfaces the ambiguity.',
      systemDesignSteps: [
        { id: 'input', label: 'Job Text / URL', caption: 'Paste or Submit', icon: 'Mail', reason: 'Accepts raw job descriptions, recruiter messages, or URLs — no structured input required.' },
        { id: 'preprocess', label: 'Preprocessing', caption: 'Extract Indicators', icon: 'Scissors', reason: 'Extracts domains, email addresses, salary claims, and urgency phrases before analysis.' },
        { id: 'fanout', label: 'Parallel Fan-out', caption: 'Promise.all Dispatch', icon: 'GitBranch', reason: 'All three signals are invoked concurrently via Promise.all — reducing p99 latency by ~60%.' },
        { id: 'ai', label: 'AI Pipeline', caption: 'Rules → Heuristics → NLP', icon: 'Brain', reason: 'NLP models are only invoked for ambiguous (0.2–0.8) scores — clear cases bypass inference entirely.' },
        { id: 'recruiter', label: 'Recruiter Check', caption: 'Domain · SSL · WHOIS', icon: 'Globe', reason: 'Validates domain age, SSL cert, and VirusTotal reputation independently of the text content.' },
        { id: 'threat', label: 'Threat Intel', caption: 'MongoDB Cross-reference', icon: 'Shield', reason: 'Cross-references extracted indicators against stored threat patterns from previous analyses.' },
        { id: 'fusion', label: 'Risk Fusion', caption: 'Weighted Verdict + Evidence', icon: 'FileText', reason: 'Combines signals: AI × 0.5 + Recruiter × 0.25 + Threat × 0.25 — each source is cited in the output.' }
      ],
      screenshots: [
        { src: '/projects/jobshield.png', alt: 'JobShield AI Dashboard', caption: 'The main risk assessment dashboard showing aggregated scores, per-signal breakdowns, and threat evidence.' }
      ]
    }
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360',
    category: 'Computer Vision',
    year: '2025-2026',
    tagline: 'Helps farmers identify crop diseases and receive actionable recommendations using computer vision and multilingual NLP.',
    problem: 'Farmers in multilingual regions lack accessible, real-time crop disease identification and actionable treatment guidance.',
    solution: 'Image-based crop analysis pipeline using FastAPI inference, Grad-CAM explainability overlays, weather-aware risk scoring, yield projection, and a multilingual recommendation engine — turning a single photo into a lender-ready farm intelligence report.',
    stack: ['React 18', 'Vite', 'Node.js', 'Express', 'FastAPI', 'TensorFlow', 'Grad-CAM', 'Supabase', 'OpenWeather API', 'i18next'],
    architectureDecisions: [
      'Built inference as a stateless FastAPI service for horizontal scaling, independent of the Express orchestration layer.',
      'Chose Grad-CAM to give farmers visual proof of which leaf regions triggered the diagnosis — significantly increasing trust over text-only confidence scores.',
      'Separated the recommendation engine from diagnosis to allow independent updates without retraining the vision model.',
      'Live weather data from OpenWeather is factored into the risk score in real time, making risk context-aware rather than static.'
    ],
    engineeringChallenge: 'Achieving real-time inference on low-resolution mobile uploads while maintaining diagnostic accuracy — solved via server-side preprocessing normalization and Sharp-based image optimization before the TensorFlow pipeline.',
    iteration: 'First version returned raw classification labels; iterated to include Grad-CAM heatmaps and localized treatment recommendations after user testing showed farmers needed visual confirmation.',
    learned: 'AI UX for non-technical users requires visual proof, not just confidence scores — Grad-CAM overlays were more persuasive than numerical outputs.',
    motivation: 'Wanted to apply AI to a real accessibility gap — farmers in multilingual regions who need actionable crop advice, not just classification labels.',
    nextImprovement: 'Add offline inference via TensorFlow Lite for areas with unreliable connectivity.',
    liveUrl: 'https://agri-360.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/AgriMitra360',
    image: '/projects/agrimitra.png',
    accentColor: 'hsl(142, 60%, 45%)',
    engineeringFocus: [
      { label: 'Computer Vision', stars: 5 },
      { label: 'Backend', stars: 4 },
      { label: 'UX Design', stars: 4 }
    ],
    keyDecision: 'Combined Grad-CAM visual heatmaps with localized weather data so farmers receive interpretable, high-trust disease diagnoses.',
    caseStudy: {
      overview: 'AgriMitra360 analyzes crop images to identify diseases, compute explainable weather-aware risk scores, project yield impact, assess credit readiness, and generate multilingual treatment recommendations — turning a single photo into a lender-ready farm intelligence report.',
      problemContext: 'In many developing agricultural regions, farmers face devastating crop losses due to delayed disease identification. Access to agricultural experts is limited, and existing digital tools often rely on text-heavy interfaces in a single language.\n\nWhen farmers use AI tools that simply return a text diagnosis, they often distrust the result. They need to see exactly why the AI made that decision and what immediate, localized steps they should take in their native language.\n\nAgriMitra360 addresses this with a full-stack pipeline: image upload triggers TensorFlow CNN diagnosis, Grad-CAM highlights the affected leaf regions, a rule-based risk engine factors in live OpenWeather data, and a multilingual assistant surfaces results in English, Hindi, or Telugu — turning a phone photo into a lender-ready farm intelligence report.',
      systemDesignSteps: [
        { id: 'image', label: 'Crop Image', caption: 'Mobile Upload', icon: 'Camera', reason: 'Accepts low-resolution mobile photos — the primary input channel for field farmers.' },
        { id: 'api', label: 'Express API', caption: 'Preprocess + Sharp', icon: 'Server', reason: 'Sharp normalizes image resolution before inference, maintaining accuracy on variable-quality uploads.' },
        { id: 'model', label: 'TensorFlow CNN', caption: 'Disease Diagnosis', icon: 'Cpu', reason: 'Stateless FastAPI inference service — independently scalable from the Express orchestration layer.' },
        { id: 'explain', label: 'Grad-CAM', caption: 'Heatmap Overlay', icon: 'Eye', reason: 'Highlights which leaf regions triggered the diagnosis — building farmer trust over text-only scores.' },
        { id: 'risk', label: 'Risk Engine', caption: 'Weather-Aware Scoring', icon: 'BarChart2', reason: 'Combines disease confidence, severity, and live OpenWeather data into a context-aware risk score.' },
        { id: 'recommend', label: 'Multilingual NLP', caption: 'Recommendations', icon: 'Languages', reason: 'Surfaces treatment steps in English, Hindi, or Telugu — localized for the target farmer audience.' },
        { id: 'trust', label: 'Trust Score', caption: 'Credit Readiness', icon: 'BadgeCheck', reason: 'Converts farm-performance signals into lender-ready eligibility summaries for agri-credit scenarios.' }
      ],
      screenshots: [
        { src: '/projects/agrimitra.png', alt: 'AgriMitra360 Dashboard', caption: 'The disease diagnosis view featuring Grad-CAM heatmap overlays and live weather risk context.' }
      ]
    }
  },
  {
    id: 'citysketch',
    title: 'CitySketch',
    category: 'AI Urban Design Studio',
    year: '2026',
    tagline: 'AI-assisted urban planning platform that converts natural-language descriptions into explainable, scorable 2D and 3D city layouts — in seconds.',
    problem: 'Urban planning prototyping requires specialized tools — most students and researchers lack accessible ways to generate and evaluate city layouts from simple descriptions. Early-stage exploration is bottlenecked by slow tooling, not geometry.',
    solution: 'Natural-language-driven layout engine using LLM-assisted intent parsing, deterministic heuristic city generation with BFS road connectivity, and synchronized 2D/3D visualization with an inline explainability engine.',
    stack: ['React 19', 'Vite', 'Three.js', 'TypeScript', 'Node.js', 'Express 5', 'Supabase', 'Zustand', 'Groq API', 'Gemini API', 'Leaflet', 'Framer Motion'],
    architectureDecisions: [
      'Used LLMs only for intent parsing (natural language to structured JSON requirements) and kept all layout logic in deterministic heuristics — making generation reproducible and consistent.',
      'BFS road connectivity validates and strengthens road networks so every zone is guaranteed reachable before the layout is returned to the client.',
      'A single Zustand layout store powers both the 2D Canvas grid and the Three.js 3D scene — keeping views synchronized from one source of truth.',
      'Explainability engine runs inline with generation, not post-hoc — every zone placement decision is recorded at the time it is made.'
    ],
    engineeringChallenge: 'Translating natural language into valid zoning coordinates over real-world geographic data — solved by separating LLM intent extraction (structured JSON) from the deterministic heuristic engine that handles zone placement and road routing.',
    iteration: 'Started with static 2D grid-only output. Iterated to add Three.js 3D views, per-cell explainability panels, a scoring engine, compare mode, blueprint rendering, and Leaflet map grounding.',
    learned: 'Hybrid AI architecture (LLM for language, heuristics for structure) produces more reliable and inspectable outputs than end-to-end generation. Explainability is not a feature — it is the product.',
    liveUrl: 'https://city-sketch.vercel.app',
    githubUrl: 'https://github.com/pranav-pachn/citySketch',
    image: '/projects/citysketch.png',
    accentColor: 'hsl(45, 80%, 50%)',
    engineeringFocus: [
      { label: 'Data Visualization', stars: 5 },
      { label: 'AI Systems', stars: 5 },
      { label: 'Frontend', stars: 4 },
      { label: 'API Integration', stars: 4 }
    ],
    keyDecision: 'Isolated LLMs to natural language intent parsing while deterministic heuristics and BFS routing guarantee valid, explainable city layouts.',
    caseStudy: {
      overview: 'CitySketch converts a plain-English city description into a scored, explainable 2D grid and interactive 3D scene — using LLM-assisted parsing, procedural heuristic generation, BFS road connectivity, and an inline explainability engine that records reasoning for every placement decision.',
      problemContext: 'Traditional urban planning tools are built for late-stage design. They are slow to learn, visually dense, and punishing for early-stage exploration. When a team needs to evaluate a district layout, smart-city concept, or campus design, the bottleneck is iteration speed — not geometry.\n\nExisting AI generation tools produce visually impressive outputs but cannot explain why a zone was placed, how a score was computed, or whether two layouts are genuinely different in quality. Planners, researchers, and students need a tool where every generated layout is defensible — not magical.\n\nCitySketch addresses this with a hybrid architecture: LLMs interpret the natural-language input into structured requirements, a deterministic heuristic engine places zones and routes roads using BFS connectivity, a scoring engine quantifies sustainability and walkability, and an explainability layer records the reasoning for every cell — so the output can be reviewed, questioned, and defended.',
      systemDesignSteps: [
        { id: 'prompt', label: 'Plain-English Prompt', caption: 'User Input', icon: 'MessageSquare', reason: 'No structured input required — users describe cities in natural language, like talking to a planner.' },
        { id: 'parser', label: 'LLM Parser', caption: 'Groq / Gemini → JSON', icon: 'Brain', reason: 'LLMs are used only for intent extraction — all layout logic is handled by deterministic heuristics.' },
        { id: 'generator', label: 'City Generator', caption: 'Heuristic Zones + BFS Roads', icon: 'Map', reason: 'BFS connectivity guarantees every zone is reachable — layouts are reproducible from the same input.' },
        { id: 'scoring', label: 'Scoring Engine', caption: 'Walkability · Density · Green', icon: 'BarChart2', reason: 'Simple, explainable formulas produce consistent comparison signals across multiple generated layouts.' },
        { id: 'explain', label: 'Explainability Engine', caption: 'Per-Cell Reasoning', icon: 'Lightbulb', reason: 'Reasoning is recorded inline during generation — not reverse-engineered — making every decision auditable.' },
        { id: 'render', label: '2D + 3D Renderer', caption: 'Canvas Grid + Three.js', icon: 'Layers', reason: 'Single Zustand store powers both views in sync — switching between 2D and 3D never loses state.' }
      ],
      screenshots: [
        { src: '/projects/citysketch.png', alt: 'CitySketch Design Studio', caption: 'The synchronized 2D grid and 3D city scene with scoring dashboard and per-cell explanation panel.' }
      ]
    }
  },
  {
    id: 'modernmart',
    title: 'ModernMart',
    category: 'E-Commerce',
    year: '2026',
    tagline: 'End-to-end e-commerce platform with Supabase auth, role-based admin, and a CI pipeline backed by comprehensive tests.',
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
      overview: 'ModernMart provides an end-to-end e-commerce storefront with customer and admin workflows built using Supabase authentication, optimistic UI state synchronization, and automated CI pipelines.',
      problemContext: 'Many portfolio e-commerce projects focus solely on frontend visuals — displaying a grid of products and a cart — while ignoring the complex realities of building a real store.\n\nWithout authentication, role-based access control, reliable database syncing, and automated testing, a store cannot scale or be maintained. The challenge was to build an application that not only looked good but incorporated the strict engineering standards expected in industry.',
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
    id: 'misinfo-analyzer',
    title: 'Misinfo Analyzer',
    category: 'AI / Trust & Safety',
    year: '2026',
    tagline: 'Classifies text and live news URLs as misinformation using NLP, with transparent confidence scoring and explainability layers.',
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
