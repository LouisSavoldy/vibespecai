import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useProjectStore } from '../../../store/projectStore';

const ArtifactViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('prd');
  const projectState = useProjectStore();

  const tabs = [
    { id: 'prd', label: 'PRD', content: projectState.prdContent },
    { id: 'techstack', label: 'Tech Stack', content: projectState.techStackContent },
    { id: 'aidirectives', label: 'AI Directives', content: projectState.aiDirectivesContent },
    { id: 'schema', label: 'Schema SQL', content: projectState.schemaSqlContent },
    { id: 'erdiagram', label: 'ER Diagram', content: projectState.schemaErDiagramContent },
  ];

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content || 'Content will appear here after the Socratic chat is complete.';

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="prose prose-blue max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
        {activeTabContent ? (
          <ReactMarkdown>{activeTabContent}</ReactMarkdown>
        ) : (
          <p className="text-gray-500 italic">Content will appear here after the Socratic chat is complete.</p>
        )}
      </div>
    </div>
  );
};

export default ArtifactViewer;
