import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SettingsPanelProps {
  selectedNodeId: string | null;
  message: string;
  onMessageChange: (message: string) => void;
  onBack: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  message,
  onMessageChange,
  onBack
}) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">Message</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Enter your message..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;