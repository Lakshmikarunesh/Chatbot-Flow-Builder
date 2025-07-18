import React from 'react';

interface SaveButtonProps {
  onSave: () => void;
  canSave: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, canSave }) => {
  return (
    <button
      onClick={onSave}
      disabled={!canSave}
      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
        canSave
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Save Changes
    </button>
  );
};

export default SaveButton;