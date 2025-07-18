import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  OnConnect,
  OnConnectStart,
  OnConnectEnd,
  NodeTypes
} from '@xyflow/react';
import { nanoid } from 'nanoid';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';
import { FlowNode, FlowEdge } from '../types';
import { validateFlow, canConnectNodes } from '../utils/validateFlow';

import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
  textNode: TextNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'textNode',
    position: { x: 300, y: 200 },
    data: { message: 'test message 1' },
  },
];

const initialEdges: Edge[] = [];

const FlowCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const connectingNodeId = useRef<string | null>(null);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;
      
      if (canConnectNodes(params.source, params.target, edges as FlowEdge[])) {
        const newEdge = {
          ...params,
          id: nanoid(),
          type: 'smoothstep',
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [edges, setEdges]
  );

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId || null;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback(() => {
    connectingNodeId.current = null;
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

      const newNode: Node = {
        id: nanoid(),
        type,
        position,
        data: { message: `New message ${nodes.length + 1}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      setShowSettings(true);
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setShowSettings(false);
  }, []);

  const onMessageChange = useCallback(
    (message: string) => {
      if (!selectedNodeId) return;
      
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId
            ? { ...node, data: { ...node.data, message } }
            : node
        )
      );
    },
    [selectedNodeId, setNodes]
  );

  const onBackToNodes = useCallback(() => {
    setShowSettings(false);
    setSelectedNodeId(null);
  }, []);

  const onSave = useCallback(() => {
    const validation = validateFlow(nodes as FlowNode[], edges as FlowEdge[]);
    
    if (validation.isValid) {
      setValidationErrors([]);
      console.log('Flow saved successfully!', { nodes, edges });
      // Here you would typically send the data to your backend
    } else {
      setValidationErrors(validation.errors);
    }
  }, [nodes, edges]);

  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  const validation = validateFlow(nodes as FlowNode[], edges as FlowEdge[]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Error Banner */}
      {validationErrors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-center">
          {validationErrors[0]}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-end">
        <SaveButton onSave={onSave} canSave={validation.isValid} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Flow Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode={['Backspace', 'Delete']}
            className="bg-gray-50"
          >
            <Background color="#e5e7eb" gap={20} />
            <Controls className="bg-white shadow-lg" />
          </ReactFlow>
        </div>

        {/* Sidebar */}
        {showSettings && selectedNode ? (
          <SettingsPanel
            selectedNodeId={selectedNodeId}
            message={selectedNode.data.message || ''}
            onMessageChange={onMessageChange}
            onBack={onBackToNodes}
          />
        ) : (
          <NodesPanel onDragStart={onDragStart} />
        )}
      </div>
    </div>
  );
};

const FlowCanvasWrapper: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWrapper;