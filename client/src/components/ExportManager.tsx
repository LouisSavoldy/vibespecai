import React, { useState } from 'react';

interface ExportManagerProps {
  localProjects: any[];
  selectedProject: any;
}

const ExportManager: React.FC<ExportManagerProps> = ({ localProjects, selectedProject }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'zip'>('json');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleExportToFile = () => {
    if (!selectedProject) return;

    const dataToExport = {
      project: selectedProject,
      artifacts: selectedProject.artifacts || {},
      exportedAt: new Date().toISOString(),
      exportVersion: '1.0'
    };

    if (exportFormat === 'json') {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedProject.name}-vibespec-export.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleExportToGitHub = () => {
    // This would trigger a flow to push to a GitHub repository
    // For now, we'll show instructions
    alert(
      'To export to GitHub:\n\n' +
      '1. Create a new repository on GitHub\n' +
      '2. Clone it locally\n' +
      '3. Export your project as JSON\n' +
      '4. Copy the artifacts to your local repository\n' +
      '5. Commit and push to GitHub\n\n' +
      'We\'re working on automating this process!'
    );
  };

  const handleImportProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        
        // Validate the imported data structure
        if (importedData.project && importedData.artifacts) {
          // Add to local storage
          const localProjects = JSON.parse(localStorage.getItem('vibespec-local-projects') || '[]');
          const importedProject = {
            ...importedData.project,
            id: Date.now(), // Generate new ID
            importedAt: new Date().toISOString(),
            artifacts: importedData.artifacts
          };
          
          localProjects.push(importedProject);
          localStorage.setItem('vibespec-local-projects', JSON.stringify(localProjects));
          
          alert('Project imported successfully! Refresh the page to see it in your project list.');
        } else {
          alert('Invalid project file format.');
        }
      } catch (error) {
        alert('Error importing project file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      border: '1px solid #e0e0e0', 
      borderRadius: '6px',
      backgroundColor: '#f9f9f9'
    }}>
      <h4 style={{ color: '#333333', marginBottom: '1rem' }}>
        📤 Export & Import Options
      </h4>

      {selectedProject ? (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ color: '#333333', marginBottom: '0.5rem' }}>
              Export Current Project: "{selectedProject.name}"
            </h5>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ marginRight: '1rem', color: '#666666' }}>
                <input
                  type="radio"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={(e) => setExportFormat(e.target.value as 'json')}
                  style={{ marginRight: '0.5rem' }}
                />
                JSON file (recommended)
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleExportToFile}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                💾 Download as File
              </button>
              
              <button
                onClick={handleExportToGitHub}
                style={{
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🐙 Export to GitHub
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Select a project to export it.
        </p>
      )}

      <div>
        <h5 style={{ color: '#333333', marginBottom: '0.5rem' }}>
          Import Project
        </h5>
        <input
          type="file"
          accept=".json"
          onChange={handleImportProject}
          style={{
            marginBottom: '0.5rem',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%'
          }}
        />
        <small style={{ color: '#666666', fontSize: '0.875rem' }}>
          Import a VibeSpec AI project from a JSON file
        </small>
      </div>

      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#e7f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '4px',
        fontSize: '0.875rem',
        color: '#0066cc'
      }}>
        <strong>💡 Pro Tips:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Export regularly to backup your work</li>
          <li>JSON files can be edited manually if needed</li>
          <li>Exported files work across different computers</li>
          <li>Share exported files with team members</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportManager;
