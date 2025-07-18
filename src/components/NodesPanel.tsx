import React from 'react';
import { MessageSquare } from 'lucide-react';

interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Message</h3>
      
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-teal-400 hover:bg-teal-50 transition-colors duration-200"
        draggable
        onDragStart={(e) => onDragStart(e, 'textNode')}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Message</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-3 text-center">
        Drag to canvas to add a message node
      </p>
    </div>
  );
};

export default NodesPanel;