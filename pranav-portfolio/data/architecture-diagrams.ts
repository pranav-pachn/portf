import { FlowDiagramData } from '../types/architecture';

export const architectureDiagrams: FlowDiagramData[] = [
  {
    id: 'jobshield-ai',
    title: 'JobShield AI Pipeline',
    description: 'A multi-stage verification pipeline that filters out noise before running expensive NLP inference.',
    accentColor: 'hsl(210, 80%, 55%)',
    nodes: [
      { id: 'input', label: 'Input Processing', caption: 'Email/Message Text', icon: 'Mail' },
      { id: 'domain', label: 'Domain Verification', caption: 'DNS & SSL Checks', icon: 'Globe' },
      { id: 'heuristics', label: 'Heuristic Scoring', caption: 'Pattern Matching', icon: 'Code' },
      { id: 'nlp', label: 'NLP Analysis', caption: 'Intent & Urgency', icon: 'Brain' },
      { id: 'aggregation', label: 'Risk Aggregation', caption: 'Weighted Scoring', icon: 'Layers' },
      { id: 'report', label: 'Explainable Report', caption: 'User Dashboard', icon: 'FileText' }
    ]
  },
  {
    id: 'agrimitra360',
    title: 'AgriMitra360 Inference',
    description: 'A stateless FastAPI service that processes low-res images and returns localized treatment data.',
    accentColor: 'hsl(142, 60%, 45%)',
    nodes: [
      { id: 'image', label: 'Crop Image', caption: 'Mobile Upload', icon: 'Camera' },
      { id: 'api', label: 'FastAPI Service', caption: 'Preprocessing', icon: 'Server' },
      { id: 'model', label: 'Diagnosis Model', caption: 'TensorFlow CNN', icon: 'Cpu' },
      { id: 'explain', label: 'Grad-CAM', caption: 'Heatmap Overlay', icon: 'Eye' },
      { id: 'recommend', label: 'Recommendations', caption: 'Multilingual NLP', icon: 'Languages' }
    ]
  }
];
