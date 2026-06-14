import { FlowDiagramData } from '../types/architecture';

export const architectureDiagrams: FlowDiagramData[] = [
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
      { id: 'aggregation', label: 'Risk Aggregation', caption: 'Weighted Scoring', icon: 'Layers', reason: 'Combines independent stage scores into a unified confidence metric.' },
      { id: 'report', label: 'Explainable Report', caption: 'User Dashboard', icon: 'FileText', reason: 'Surfaces exactly which stage flagged the message to build user trust.' }
    ]
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360 Inference',
    description: 'A lightweight inference service that processes low-resolution crop images efficiently and returns localized recommendations with explainability cues for better user trust.',
    accentColor: 'hsl(142, 60%, 45%)',
    nodes: [
      { id: 'image', label: 'Crop Image', caption: 'Mobile Upload', icon: 'Camera', reason: 'Captures low-res images often compressed by slow rural networks.' },
      { id: 'api', label: 'FastAPI Service', caption: 'Preprocessing', icon: 'Server', reason: 'Stateless API to normalize image tensors before inference.' },
      { id: 'model', label: 'Diagnosis Model', caption: 'TensorFlow CNN', icon: 'Cpu', reason: 'Performs multi-class disease classification.' },
      { id: 'explain', label: 'Grad-CAM', caption: 'Heatmap Overlay', icon: 'Eye', reason: 'Visualizes exactly which leaf spots triggered the disease label.' },
      { id: 'recommend', label: 'Recommendations', caption: 'Multilingual NLP', icon: 'Languages', reason: 'Translates treatment guidance into local farmer dialects.' }
    ]
  }
];
