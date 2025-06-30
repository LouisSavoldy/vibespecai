import React, { useState } from 'react';
import { useProjectStore } from '../../../store/projectStore';

interface SocraticChatProps {
  onChatComplete: () => void;
}

interface Question {
  id: string;
  question: string;
  type: 'text' | 'select';
  options?: string[];
}

const questions: Question[] = [
  {
    id: 'targetAudience',
    question: 'Who is this for? Is it for beginners who just bought their first succulent, or expert botanists?',
    type: 'text',
  },
  {
    id: 'problemStatement',
    question: 'What is the biggest problem you are solving for them? Are they struggling to identify plants, or do they just want a community?',
    type: 'text',
  },
  {
    id: 'coreFeatures',
    question: 'What are the main things you want people to be able to do? (e.g., upload a photo, browse a feed, ask a question, create a profile). Please list them separated by commas.',
    type: 'text',
  },
];

const SocraticChat: React.FC<SocraticChatProps> = ({ onChatComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const projectStore = useProjectStore();

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.id.startsWith('frontend') || currentQuestion.id.startsWith('backend') || currentQuestion.id === 'database' || currentQuestion.id === 'deployment') {
      projectStore.setTechStack(currentQuestion.id as any, answer);
    } else if (currentQuestion.id.startsWith('projectStructure') || currentQuestion.id.startsWith('codeStyleStrictness') || currentQuestion.id.startsWith('apiDesign') || currentQuestion.id.startsWith('errorHandling') || currentQuestion.id.startsWith('testingPhilosophy')) {
      projectStore.setArchitecture(currentQuestion.id as any, answer);
    } else {
      projectStore.setAnswer(currentQuestion.id as any, answer);
    }

    setAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onChatComplete();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {currentQuestion.question}
        </h3>
        
        {currentQuestion.type === 'text' ? (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer..."
          />
        ) : (
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          >
            <option value="">Select an option</option>
            {currentQuestion.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Action button */}
      <div className="flex justify-center">
        <button
          className="px-8 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleNext}
          disabled={!answer.trim()}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Generate Blueprint'}
        </button>
      </div>
    </div>
  );
};

export default SocraticChat;
