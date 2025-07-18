import { FlowNode, FlowEdge, ValidationResult } from '../types';

export const validateFlow = (nodes: FlowNode[], edges: FlowEdge[]): ValidationResult => {
  const errors: string[] = [];
  
  // Find nodes with no incoming edges (root nodes)
  const nodesWithIncomingEdges = new Set(edges.map(edge => edge.target));
  const rootNodes = nodes.filter(node => !nodesWithIncomingEdges.has(node.id));
  
  if (rootNodes.length > 1) {
    errors.push('Cannot save Flow');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const canConnectNodes = (sourceId: string, targetId: string, edges: FlowEdge[]): boolean => {
  // Check if source already has an outgoing edge
  const sourceHasOutgoing = edges.some(edge => edge.source === sourceId);
  
  // Check if this would create a self-loop
  if (sourceId === targetId) return false;
  
  // Check if connection already exists
  const connectionExists = edges.some(edge => edge.source === sourceId && edge.target === targetId);
  
  return !sourceHasOutgoing && !connectionExists;
};