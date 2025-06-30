import React, { useState } from 'react';
import { useProjectStore } from '../../../store/projectStore';

interface VibeInputProps {
  onVibeSubmit: () => void;
}

const VibeInput: React.FC<VibeInputProps> = ({ onVibeSubmit }) => {
  const [vibe, setVibe] = useState('');
  const setProjectVibe = useProjectStore((state) => state.setVibe);

  const handleSubmit = () => {
    setProjectVibe(vibe);
    onVibeSubmit();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">What's the vibe? In a sentence or two, what are you trying to build?</h2>
      
      <div className="space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          rows={4}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="A cool app where plant lovers can share pictures of their plants and get care tips."
        />
        
        <div className="flex justify-center">
          <button
            className="px-8 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleSubmit}
            disabled={!vibe.trim()}
          >
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default VibeInput;
