import { FlowDiagramData } from '../types/architecture';

export const architectureDiagrams: FlowDiagramData[] = [
  {
    id: 'specforge',
    title: 'SpecForge LLM Pipeline',
    description: 'An AI orchestration pipeline that reliably transforms natural language product ideas into strict engineering specs, database schemas, and step-by-step execution plans.',
    accentColor: 'hsl(240, 80%, 60%)',
    nodes: [
      { id: 'input', label: 'User Intent', caption: 'Natural Language', icon: 'MessageSquare', reason: 'Unstructured idea input from the user.' },
      { id: 'router', label: 'AI Router', caption: 'Agent Orchestration', icon: 'Workflow', reason: 'Routes tasks to specialized agents (planning vs execution).' },
      { id: 'spec', label: 'Spec Generation', caption: 'LLM Workflow', icon: 'FileText', reason: 'Generates structured product requirements.' },
      { id: 'schema', label: 'DB Schema', caption: 'Structured Output', icon: 'Database', reason: 'Forces LLM to output valid SQL schemas.' },
      { id: 'plan', label: 'Execution Plan', caption: 'Discrete Steps', icon: 'ListChecks', reason: 'Breaks down the spec into actionable development tasks.' }
    ]
  },
  {
    id: 'jobshield-ai',
    title: 'JobShield AI Pipeline',
    description: 'A staged fraud-risk pipeline that filters low-signal inputs early, reducing unnecessary inference cost while preserving explainable job-risk analysis.',
    accentColor: 'hsl(210, 80%, 55%)',
    nodes: [
      { id: 'input', label: 'Input Processing', caption: 'Email/Message Text', icon: 'Mail', reason: 'Sanitizes raw unstructured data from emails or messages.' },
      { id: 'domain', label: 'Domain Verification', caption: 'DNS & SSL Checks', icon: 'Globe', reason: 'Catches spoofed domains early before expensive NLP runs.' },
      { id: 'heuristics', label: 'Heuristic Scoring', caption: 'Pattern Matching', icon: 'Code', reason: 'Flags known scam patterns using low-latency regex and rules.' },
      { id: 'nlp', label: 'NLP Analysis', caption: 'Intent & Urgency', icon: 'Brain', reason: 'Evaluates subtle contextual urgency or coercive phrasing.' },
      { id: 'report', label: 'Explainable Report', caption: 'User Dashboard', icon: 'FileText', reason: 'Surfaces exactly which stage flagged the message to build user trust.' }
    ]
  },
  {
    id: 'temporalrent',
    title: 'TemporalRent Reservation Engine',
    description: 'A conflict-free inventory reservation pipeline that expands package BOMs into physical item demand, computes buffer-aware time windows, and confirms bookings inside ACID transactions.',
    accentColor: 'hsl(30, 80%, 55%)',
    nodes: [
      { id: 'booking', label: 'Booking Request', caption: 'Package + Items', icon: 'ShoppingCart', reason: 'Accepts packages or individual items; both normalized into the same demand pipeline.' },
      { id: 'bom', label: 'BOM Expansion', caption: 'Package \u2192 Physical Items', icon: 'GitBranch', reason: 'Expands package abstractions into concrete physical quantities before any availability check.' },
      { id: 'buffer', label: 'Buffer Resolution', caption: 'Prep + Transit + Cleanup', icon: 'Clock', reason: 'Widens the effective time window to prevent conflicts from staging and logistics overlap.' },
      { id: 'check', label: 'Availability Check', caption: 'tstzrange Overlap Query', icon: 'Search', reason: 'PostgreSQL GiST-indexed range queries detect all overlapping demand in a single query.' },
      { id: 'lock', label: 'ACID Transaction', caption: 'Row Locks + Re-verify', icon: 'Lock', reason: 'Deterministic lock ordering prevents deadlocks; in-transaction re-check prevents race conditions.' },
      { id: 'confirm', label: 'Reservation', caption: 'Audit + State Machine', icon: 'CheckCircle', reason: 'Transitions booking through a typed state machine and writes an immutable audit event.' }
    ]
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360 Analysis Pipeline',
    description: 'A full-stack agricultural intelligence pipeline that turns a crop photo into a disease diagnosis, explainable risk score, yield projection, and lender-ready trust report.',
    accentColor: 'hsl(142, 60%, 45%)',
    nodes: [
      { id: 'image', label: 'Crop Image', caption: 'Mobile Upload', icon: 'Camera', reason: 'Accepts low-resolution mobile photos — the primary input channel for field farmers.' },
      { id: 'api', label: 'Express API', caption: 'Preprocess + Sharp', icon: 'Server', reason: 'Sharp normalizes image resolution before inference, maintaining accuracy on variable inputs.' },
      { id: 'model', label: 'TensorFlow CNN', caption: 'Disease Diagnosis', icon: 'Cpu', reason: 'Stateless FastAPI inference service — independently scalable from the Express layer.' },
      { id: 'explain', label: 'Grad-CAM', caption: 'Heatmap Overlay', icon: 'Eye', reason: 'Highlights which leaf regions triggered the diagnosis — building trust beyond confidence scores.' },
      { id: 'risk', label: 'Risk Engine', caption: 'Weather-Aware Scoring', icon: 'BarChart2', reason: 'Combines disease severity and live OpenWeather data into a context-aware risk score.' },
      { id: 'trust', label: 'Trust Score', caption: 'Credit Readiness', icon: 'BadgeCheck', reason: 'Converts farm-performance signals into lender-ready eligibility summaries.' }
    ]
  },
  {
    id: 'citysketch',
    title: 'CitySketch Generation Pipeline',
    description: 'A hybrid AI + heuristics pipeline that converts a plain-English prompt into a scored, explainable 2D/3D city layout with per-cell reasoning for every placement decision.',
    accentColor: 'hsl(45, 80%, 50%)',
    nodes: [
      { id: 'prompt', label: 'Natural Language Prompt', caption: 'User Input', icon: 'MessageSquare', reason: 'No structured input required — users describe cities in plain English.' },
      { id: 'parser', label: 'LLM Parser', caption: 'Groq / Gemini \u2192 JSON', icon: 'Brain', reason: 'LLMs handle only intent extraction — all layout logic runs in deterministic heuristics.' },
      { id: 'generator', label: 'City Generator', caption: 'Heuristic + BFS Roads', icon: 'Map', reason: 'BFS connectivity guarantees every zone is reachable; layouts are reproducible.' },
      { id: 'scoring', label: 'Scoring Engine', caption: 'Walkability \u00b7 Density \u00b7 Green', icon: 'BarChart2', reason: 'Explainable formulas produce consistent comparison signals across multiple candidates.' },
      { id: 'render', label: '2D + 3D Renderer', caption: 'Canvas + Three.js', icon: 'Layers', reason: 'Single Zustand store drives both views in sync — no state divergence between 2D and 3D.' }
    ]
  }
];
