import React, { useState, useEffect } from 'react';
import ExportManager from './ExportManager';
import { type Repository } from '../store/projectStore';

interface LocalStorageOptionProps {
  onRepositorySelected: (repository: Repository) => void;
}

const LocalStorageOption: React.FC<LocalStorageOptionProps> = ({ onRepositorySelected }) => {
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showExistingProjects, setShowExistingProjects] = useState(false);

  useEffect(() => {
    // Load existing local projects
    const projects = JSON.parse(localStorage.getItem('vibespec-local-projects') || '[]');
    setLocalProjects(projects);
    setShowExistingProjects(projects.length > 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      return;
    }

    setLoading(true);

    // Create a virtual repository for local storage
    const localRepository: Repository = {
      id: Date.now(), // Use timestamp as unique ID
      name: projectName.trim().replace(/\s+/g, '-').toLowerCase(),
      full_name: `local/${projectName.trim().replace(/\s+/g, '-').toLowerCase()}`,
      description: `Local VibeSpec AI project: ${projectName}`,
      private: true, // Consider local storage as private
      html_url: '', // No URL for local storage
      updated_at: new Date().toISOString(),
      isLocal: true // Flag to identify local storage repositories
    };

    // Store project metadata locally
    const localProjects = JSON.parse(localStorage.getItem('vibespec-local-projects') || '[]');
    localProjects.push({
      ...localRepository,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('vibespec-local-projects', JSON.stringify(localProjects));

    setTimeout(() => {
      onRepositorySelected(localRepository);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ color: '#333333' }}>
      <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
        💾 Store Artifacts Locally
      </h3>
      <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
        Keep all your VibeSpec AI artifacts on your local machine. No GitHub access required.
        Perfect for sensitive projects or offline work.
      </p>

      <div style={{ 
        padding: '1.5rem', 
        border: '1px solid #e0e0e0', 
        borderRadius: '8px', 
        backgroundColor: '#f9f9f9',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#333333', marginBottom: '1rem' }}>✅ Benefits:</h4>
        <ul style={{ color: '#666666', paddingLeft: '1.5rem' }}>
          <li>Complete privacy - nothing leaves your machine</li>
          <li>No GitHub permissions needed</li>
          <li>Works offline</li>
          <li>Perfect for sensitive or proprietary projects</li>
          <li>You can always export to GitHub later</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#333333',
            fontWeight: 'bold'
          }}>
            Project Name:
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., My Awesome App"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              color: '#333333'
            }}
            required
          />
          <small style={{ color: '#666666', fontSize: '0.875rem' }}>
            This will be used to organize your local artifacts
          </small>
        </div>

        <button
          type="submit"
          disabled={loading || !projectName.trim()}
          style={{
            backgroundColor: loading ? '#ccc' : '#17a2b8',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          {loading ? 'Setting up...' : 'Create Local Project'}
        </button>
      </form>

      <div style={{ 
        fontSize: '0.875rem', 
        color: '#666666', 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
        border: '1px solid #b3d9ff'
      }}>
        <strong>💡 Tip:</strong> Local artifacts are stored in your browser's storage. 
        You can export them to GitHub or other platforms at any time using the export feature.
      </div>

      {/* Existing Local Projects */}
      {showExistingProjects && (
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#333333', marginBottom: '1rem' }}>
            📁 Your Local Projects ({localProjects.length})
          </h4>
          
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            marginBottom: '1rem'
          }}>
            {localProjects.map((project, index) => (
              <div
                key={project.id || index}
                style={{
                  padding: '1rem',
                  borderBottom: index < localProjects.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  backgroundColor: selectedProject?.id === project.id ? '#e7f3ff' : 'white'
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ 
                      margin: 0, 
                      marginBottom: '0.5rem',
                      color: '#333333',
                      fontWeight: 'bold'
                    }}>
                      {project.name}
                    </h5>
                    <p style={{ 
                      margin: 0, 
                      marginBottom: '0.5rem', 
                      color: '#666666',
                      fontSize: '0.875rem'
                    }}>
                      {project.description}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                      💾 Local • Created {new Date(project.createdAt || project.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {selectedProject?.id === project.id && (
                      <span style={{ 
                        color: '#28a745', 
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRepositorySelected(project);
                      }}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Use Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Manager */}
          <ExportManager 
            localProjects={localProjects} 
            selectedProject={selectedProject}
          />
        </div>
      )}
    </div>
  );
};

export default LocalStorageOption;
