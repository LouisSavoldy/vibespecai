import React, { useState } from 'react';
import VibeInput from '../features/project_creation/components/VibeInput';
import SocraticChat from '../features/project_creation/components/SocraticChat';
import ArtifactViewer from '../features/project_creation/components/ArtifactViewer';
import { useProjectStore, GeneratedArtifacts } from '../store/projectStore';
import { generateBlueprintFiles } from '../features/project_creation/utils/blueprintGenerator';
import FileTree from '../features/project_creation/components/FileTree';

const Workspace: React.FC = () => {
  const [currentStep, setCurrentStep] = useState('vibeInput'); // 'vibeInput', 'socraticChat', 'artifactViewer'
  const projectState = useProjectStore((state) => state);
  const { setGeneratedArtifacts, setSelectedArtifact } = useProjectStore();

  const handleVibeSubmit = () => {
    setCurrentStep('socraticChat');
  };

  const handleChatComplete = () => {
    const blueprint = generateBlueprintFiles(projectState);
    setGeneratedArtifacts(blueprint);
    setCurrentStep('artifactViewer');
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedArtifact(fileName as keyof GeneratedArtifacts);
  };

  const getFileTreeData = () => {
    if (!projectState.generatedArtifacts) return [];
    return Object.keys(projectState.generatedArtifacts).map(key => ({
      name: key,
      type: 'file' as const,
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-gray-900">Project: {projectState.vibe ? projectState.vibe.substring(0, 30) + (projectState.vibe.length > 30 ? '...' : '') : 'New Project'}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">VibeSpecAI</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
            U
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Project Steps</h2>
          </div>
          
          <div className="p-4 space-y-6">
            {/* STEP 1: The Vibe */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">STEP 1: The Vibe</h3>
              <div className="space-y-2 ml-4">
                <div className="flex items-center space-x-2">
                  {currentStep !== 'vibeInput' ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-yellow-500">⏳</span>
                  )}
                  <span className={`text-sm ${currentStep !== 'vibeInput' ? 'text-gray-700' : 'text-blue-600 font-medium'}`}>
                    Core Idea
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {currentStep === 'socraticChat' || currentStep === 'artifactViewer' ? (
                    <span className="text-yellow-500">⏳</span>
                  ) : (
                    <span className="text-gray-400">⬜</span>
                  )}
                  <span className={`text-sm ${currentStep === 'socraticChat' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    Target Audience
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {currentStep === 'socraticChat' || currentStep === 'artifactViewer' ? (
                    <span className="text-yellow-500">⏳</span>
                  ) : (
                    <span className="text-gray-400">⬜</span>
                  )}
                  <span className={`text-sm ${currentStep === 'socraticChat' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    Core Problem
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 2: The Blueprint */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">STEP 2: The Blueprint</h3>
              <div className="space-y-2 ml-4">
                <div className="flex items-center space-x-2">
                  {currentStep === 'artifactViewer' ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-gray-400">⬜</span>
                  )}
                  <span className={`text-sm ${currentStep === 'artifactViewer' ? 'text-green-600' : 'text-gray-500'}`}>
                    Tech Stack
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {currentStep === 'artifactViewer' ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-gray-400">⬜</span>
                  )}
                  <span className={`text-sm ${currentStep === 'artifactViewer' ? 'text-green-600' : 'text-gray-500'}`}>
                    Features & Tasks
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 3: AI Artifacts */}
            {currentStep === 'artifactViewer' && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">STEP 3: AI Artifacts</h3>
                <div className="ml-4 mt-4">
                  <FileTree files={getFileTreeData()} onFileSelect={handleFileSelect} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Pane */}
        <div className="flex-1 flex flex-col bg-white">
          {/* File Header */}
          {currentStep === 'artifactViewer' && (
            <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>/docs/PRD.md</span>
                <button className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">View</button>
                <button className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">Edit</button>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {currentStep === 'vibeInput' && (
              <div className="max-w-2xl">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2 text-gray-900">Welcome to VibeSpecAI!</h1>
                  <p className="text-gray-600">Let's get that brilliant idea out of your head and into code.</p>
                </div>
                <VibeInput onVibeSubmit={handleVibeSubmit} />
              </div>
            )}
            {currentStep === 'socraticChat' && (
              <div className="max-w-2xl">
                <SocraticChat onChatComplete={handleChatComplete} />
              </div>
            )}
            {currentStep === 'artifactViewer' && (
              <div className="w-full">
                <ArtifactViewer />
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          {currentStep === 'artifactViewer' && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-center">
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  ✅ Looks Good, Next Step
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Pane - AI Chat Agent */}
        <div className="w-80 bg-gray-900 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold">AI Chat Agent</h2>
            <button className="text-gray-400 hover:text-white">×</button>
          </div>
          
          <div className="flex-1 p-4 space-y-4">
            {currentStep === 'vibeInput' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  Great start! Tell me about your idea. Don't worry about being perfect - just capture the essence of what you're trying to build.
                </p>
              </div>
            )}
            
            {currentStep === 'socraticChat' && (
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  I'm going to ask you some targeted questions to understand your project better. Each answer helps me create a more detailed blueprint for you.
                </p>
              </div>
            )}
            
            {currentStep === 'artifactViewer' && (
              <div className="bg-green-900 rounded-lg p-4">
                <p className="text-sm text-gray-200">
                  � <strong>Congratulations!</strong> Your project blueprint is ready! Review the documents in the tabs above.
                </p>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400">
                💡 <strong>Tip:</strong> You can review and edit any of the generated documents before moving to the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;