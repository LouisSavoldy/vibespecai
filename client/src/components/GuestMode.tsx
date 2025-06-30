import React, { useState } from 'react';
import { type Repository } from '../store/projectStore';

interface GuestModeProps {
  onRepositorySelected: (repository: Repository) => void;
  onGuestModeEnabled: () => void;
}

const GuestMode: React.FC<GuestModeProps> = ({ onRepositorySelected, onGuestModeEnabled }) => {
  const [projectName, setProjectName] = useState('');
  const [userName, setUserName] = useState('');

  const handleGuestStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !userName.trim()) return;

    // Create a guest mode "repository"
    const guestRepository: Repository = {
      id: Date.now(),
      name: projectName.trim().replace(/\s+/g, '-').toLowerCase(),
      full_name: `guest/${projectName.trim().replace(/\s+/g, '-').toLowerCase()}`,
      description: `Guest mode project: ${projectName}`,
      private: true,
      html_url: '',
      updated_at: new Date().toISOString(),
      isLocal: true
    };

    // Store guest session info
    localStorage.setItem('vibespec-guest-mode', JSON.stringify({
      userName: userName.trim(),
      projectName: projectName.trim(),
      startedAt: new Date().toISOString()
    }));

    onGuestModeEnabled();
    onRepositorySelected(guestRepository);
  };

  return (
    <div style={{ color: '#333333' }}>
      <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
        👤 Guest Mode (No Account Required)
      </h3>
      <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
        Try VibeSpec AI without creating any accounts or granting permissions. 
        Perfect for quick prototyping and evaluation.
      </p>

      <div style={{ 
        padding: '1.5rem', 
        border: '1px solid #28a745', 
        borderRadius: '8px', 
        backgroundColor: '#f8fff8',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#333333', marginBottom: '1rem' }}>✅ Guest Mode Benefits:</h4>
        <ul style={{ color: '#666666', paddingLeft: '1.5rem' }}>
          <li>No account creation or authentication required</li>
          <li>No permissions or OAuth flows</li>
          <li>Instant access to VibeSpec AI features</li>
          <li>All artifacts stored locally</li>
          <li>Can export and save your work manually</li>
          <li>Perfect for evaluation and quick prototyping</li>
        </ul>
      </div>

      <form onSubmit={handleGuestStart} style={{ marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#333333',
            fontWeight: 'bold'
          }}>
            Your Name:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g., John Doe"
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
            Used for personalization and artifact attribution
          </small>
        </div>

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
            This will be used to organize your artifacts
          </small>
        </div>

        <button
          type="submit"
          disabled={!projectName.trim() || !userName.trim()}
          style={{
            backgroundColor: !projectName.trim() || !userName.trim() ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: !projectName.trim() || !userName.trim() ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          🚀 Start in Guest Mode
        </button>
      </form>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <strong style={{ color: '#856404' }}>⚠️ Guest Mode Limitations:</strong>
        <ul style={{ color: '#856404', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>No automatic cloud backup or version control</li>
          <li>Data only stored in your browser (can be lost if cleared)</li>
          <li>Cannot collaborate with others in real-time</li>
          <li>Limited to local artifact storage and manual export</li>
        </ul>
      </div>

      <div style={{ 
        fontSize: '0.875rem', 
        color: '#666666', 
        padding: '1rem',
        backgroundColor: '#e7f3ff',
        borderRadius: '4px',
        border: '1px solid #b3d9ff'
      }}>
        <strong>🔄 Upgrade Path:</strong> You can always create a GitHub account later and 
        migrate your guest mode projects. Your work won't be lost!
      </div>
    </div>
  );
};

export default GuestMode;
