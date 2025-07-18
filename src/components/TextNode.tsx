import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

interface TextNodeData {
  message: string;
}

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg border-2 min-w-[200px] ${
      selected ? 'border-blue-400' : 'border-gray-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-4 py-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium text-sm">Send Message</span>
        </div>
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <MessageSquare className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-gray-700 text-sm leading-relaxed">
          {data.message || 'Enter your message...'}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default TextNode;