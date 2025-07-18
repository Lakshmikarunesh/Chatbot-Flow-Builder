export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    message: string;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}