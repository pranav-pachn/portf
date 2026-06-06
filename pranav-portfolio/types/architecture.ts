export interface FlowNode {
  id: string;
  label: string;
  caption: string;
  icon: string; // Lucide icon name
}

export interface FlowDiagramData {
  id: string;
  title: string;
  description: string;
  nodes: FlowNode[];
  accentColor: string;
}
