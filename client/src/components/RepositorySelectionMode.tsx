import React, { useState } from 'react';
import RepositoryManager from './RepositoryManager';
import ManualRepositoryInput from './ManualRepositoryInput';
import LocalStorageOption from './LocalStorageOption';
import PublicRepositoriesOnly from './PublicRepositoriesOnly';
import { type Repository } from '../store/projectStore';

interface RepositorySelectionModeProps {
  user: any;
  onRepositorySelected: (repository: Repository) => void;
}

const RepositorySelectionMode: React.FC<RepositorySelectionModeProps> = ({ 
  user, 
  onRepositorySelected 
}) => {
  const [selectionMode, setSelectionMode] = useState<'choose' | 'full-access' | 'manual' | 'create-only' | 'public-only' | 'local-storage'>('choose');

  if (selectionMode === 'choose') {
    return (
      <div style={{ color: '#333333' }}>
        <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
          Choose Your Repository Access Level
        </h3>
        <p style={{ color: '#666666', marginBottom: '2rem' }}>
          Select how you'd like VibeSpec AI to access your GitHub repositories:
        </p>

        {/* Option 1: Full Access */}
        <div style={{ 
          padding: '1.5rem', 
          border: '2px solid #28a745', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          backgroundColor: '#f8fff8'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>
            🔓 Full Repository Access (Recommended)
          </h4>
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            View and select from all your repositories (public and private). 
            Most convenient option.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
            <strong>Permissions needed:</strong> Read access to all repositories
          </div>
          <button
            onClick={() => setSelectionMode('full-access')}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Grant Full Access
          </button>
        </div>

        {/* Option 2: Public Repositories Only */}
        <div style={{ 
          padding: '1.5rem', 
          border: '2px solid #17a2b8', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          backgroundColor: '#e7f3ff'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>
            🌍 Public Repositories Only (Recommended for Open Source)
          </h4>
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            Access only your public repositories using GitHub's public API. 
            Perfect balance of convenience and privacy.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
            <strong>Permissions needed:</strong> No special permissions (uses public API)
          </div>
          <button
            onClick={() => setSelectionMode('public-only')}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Use Public Repositories
          </button>
        </div>

        <div style={{ 
          padding: '1.5rem', 
          border: '2px solid #007bff', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          backgroundColor: '#f8f9fa'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>
            🔒 Manual Repository Selection (Privacy-Focused)
          </h4>
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            Specify a repository manually without granting broad access. 
            Best for privacy-conscious users.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
            <strong>Permissions needed:</strong> Only basic profile information
          </div>
          <button
            onClick={() => setSelectionMode('manual')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Enter Repository Manually
          </button>
        </div>

        {/* Option 4: Local Storage */}
        <div style={{ 
          padding: '1.5rem', 
          border: '2px solid #6f42c1', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          backgroundColor: '#f8f7ff'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>
            💾 Local Storage (Maximum Privacy)
          </h4>
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            Store all artifacts locally on your machine. Perfect for sensitive projects 
            or when you want complete control.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
            <strong>Permissions needed:</strong> None - everything stays local
          </div>
          <button
            onClick={() => setSelectionMode('local-storage')}
            style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Use Local Storage
          </button>
        </div>

        {/* Option 5: Create Only */}
        <div style={{ 
          padding: '1.5rem', 
          border: '2px solid #ffc107', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          backgroundColor: '#fff9e6'
        }}>
          <h4 style={{ color: '#333333', marginBottom: '0.5rem' }}>
            ➕ Create New Repository Only
          </h4>
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            Create a new repository specifically for VibeSpec projects. 
            Clean slate approach.
          </p>
          <div style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
            <strong>Permissions needed:</strong> Create public repositories only
          </div>
          <button
            onClick={() => setSelectionMode('create-only')}
            style={{
              backgroundColor: '#ffc107',
              color: '#333333',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create New Repository
          </button>
        </div>

        <div style={{ 
          fontSize: '0.875rem', 
          color: '#666666', 
          textAlign: 'center',
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#e9ecef',
          borderRadius: '4px'
        }}>
          <strong>Privacy Note:</strong> You can always change permissions later or revoke access 
          at <a href="https://github.com/settings/applications" target="_blank" rel="noopener noreferrer">
            GitHub Settings → Applications
          </a>
        </div>
      </div>
    );
  }

  // Show the selected mode
  if (selectionMode === 'full-access') {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setSelectionMode('choose')}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666666'
            }}
          >
            ← Back to Options
          </button>
        </div>
        <RepositoryManager user={user} onRepositorySelected={onRepositorySelected} />
      </div>
    );
  }

  if (selectionMode === 'public-only') {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setSelectionMode('choose')}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666666'
            }}
          >
            ← Back to Options
          </button>
        </div>
        <PublicRepositoriesOnly user={user} onRepositorySelected={onRepositorySelected} />
      </div>
    );
  }

  if (selectionMode === 'manual') {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setSelectionMode('choose')}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666666'
            }}
          >
            ← Back to Options
          </button>
        </div>
        <ManualRepositoryInput onRepositorySelected={onRepositorySelected} />
      </div>
    );
  }

  if (selectionMode === 'local-storage') {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setSelectionMode('choose')}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666666'
            }}
          >
            ← Back to Options
          </button>
        </div>
        <LocalStorageOption onRepositorySelected={onRepositorySelected} />
      </div>
    );
  }

  if (selectionMode === 'create-only') {
    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setSelectionMode('choose')}
            style={{ 
              background: 'none', 
              border: '1px solid #ccc', 
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              color: '#666666'
            }}
          >
            ← Back to Options
          </button>
        </div>
        {/* For create-only mode, we'll show just the create form from RepositoryManager */}
        <div style={{ color: '#333333' }}>
          <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
            ➕ Create New Repository
          </h3>
          <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
            Create a new repository specifically for your VibeSpec AI projects.
          </p>
          <RepositoryManager user={user} onRepositorySelected={onRepositorySelected} />
        </div>
      </div>
    );
  }

  return null;
};

export default RepositorySelectionMode;
