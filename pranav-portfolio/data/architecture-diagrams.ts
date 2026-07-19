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
    id: 'matrixos',
    title: 'MatrixOS Sync Engine',
    description: 'A real-time collaboration engine that uses CRDTs and WebSockets to synchronize block-based document states seamlessly across multiple connected clients.',
    accentColor: 'hsl(280, 70%, 55%)',
    nodes: [
      { id: 'editor', label: 'Block Editor', caption: 'React UI', icon: 'Edit3', reason: 'Captures user edits locally in real-time.' },
      { id: 'crdt', label: 'CRDT Sync', caption: 'Yjs Document', icon: 'RefreshCw', reason: 'Resolves edit conflicts automatically on the client.' },
      { id: 'websocket', label: 'WebSocket Server', caption: 'Node.js Engine', icon: 'Server', reason: 'Broadcasts document updates to all connected peers.' },
      { id: 'database', label: 'Persistence', caption: 'PostgreSQL', icon: 'Database', reason: 'Persists document snapshots securely.' },
      { id: 'ai', label: 'Embedded AI', caption: 'Contextual Assist', icon: 'Wand2', reason: 'Provides inline AI suggestions based on document context.' }
    ]
  }
];
