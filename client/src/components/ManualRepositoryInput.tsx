import React, { useState } from 'react';
import { type Repository } from '../store/projectStore';

interface ManualRepositoryInputProps {
  onRepositorySelected: (repository: Repository) => void;
}

const ManualRepositoryInput: React.FC<ManualRepositoryInputProps> = ({ onRepositorySelected }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useAdvanced, setUseAdvanced] = useState(false);

  // Parse repository URL to extract owner and repo name
  const parseRepositoryUrl = (url: string): { owner: string; repo: string } | null => {
    if (!url.trim()) return null;

    try {
      // Handle different URL formats:
      // https://github.com/owner/repo
      // https://github.com/owner/repo.git
      // git@github.com:owner/repo.git
      // owner/repo

      let cleanUrl = url.trim();

      // Handle SSH format: git@github.com:owner/repo.git
      if (cleanUrl.startsWith('git@github.com:')) {
        cleanUrl = cleanUrl.replace('git@github.com:', '');
      }
      // Handle HTTPS format: https://github.com/owner/repo
      else if (cleanUrl.includes('github.com/')) {
        const match = cleanUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
        if (match) {
          cleanUrl = match[1];
        }
      }

      // Remove .git suffix if present
      cleanUrl = cleanUrl.replace(/\.git$/, '');

      // Split by / to get owner and repo
      const parts = cleanUrl.split('/');
      if (parts.length >= 2) {
        const owner = parts[parts.length - 2];
        const repo = parts[parts.length - 1];
        
        if (owner && repo) {
          return { owner: owner.trim(), repo: repo.trim() };
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  // Handle URL input change
  const handleUrlChange = (url: string) => {
    setRepoUrl(url);
    setError('');
    
    const parsed = parseRepositoryUrl(url);
    if (parsed) {
      setRepoOwner(parsed.owner);
      setRepoName(parsed.repo);
    } else if (url.trim()) {
      // Clear the parsed values if URL is invalid but not empty
      setRepoOwner('');
      setRepoName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let owner = repoOwner.trim();
    let name = repoName.trim();

    // If using URL input, try to parse it first
    if (!useAdvanced && repoUrl.trim()) {
      const parsed = parseRepositoryUrl(repoUrl);
      if (parsed) {
        owner = parsed.owner;
        name = parsed.repo;
      } else {
        setError('Please enter a valid GitHub repository URL');
        return;
      }
    }

    // Validate we have both owner and name
    if (!owner || !name) {
      setError('Please provide both repository owner and name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify the repository exists using GitHub's public API
      const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
      
      if (response.ok) {
        const repoData = await response.json();
        
        // Create a Repository object from the public data
        const repository: Repository = {
          id: repoData.id,
          name: repoData.name,
          full_name: repoData.full_name,
          description: repoData.description || '',
          private: repoData.private,
          html_url: repoData.html_url,
          updated_at: repoData.updated_at
        };

        onRepositorySelected(repository);
      } else if (response.status === 404) {
        setError('Repository not found. Please check the repository URL or owner/name.');
      } else {
        setError('Unable to verify repository. It may be private or inaccessible.');
      }
    } catch (err) {
      setError('Error checking repository. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: '#333333' }}>
      <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
        🔒 Manual Repository Selection
      </h3>
      <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
        Specify a GitHub repository manually without granting broad access. 
        Paste a repository URL or enter the details manually.
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
          <li>No broad repository access permissions needed</li>
          <li>Works with both public and private repositories (if you have access)</li>
          <li>Only requires basic GitHub profile information</li>
          <li>You maintain full control over which repository is accessed</li>
        </ul>
      </div>

      {error && (
        <div style={{
          color: '#dc3545',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!useAdvanced ? (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#333333',
              fontWeight: 'bold'
            }}>
              Repository URL:
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://github.com/owner/repo or git@github.com:owner/repo.git"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                color: '#333333',
                fontFamily: 'monospace'
              }}
              required
            />
            <small style={{ color: '#666666', fontSize: '0.875rem' }}>
              Paste any GitHub repository URL (HTTPS or SSH format)
            </small>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333333',
                fontWeight: 'bold'
              }}>
                Repository Owner:
              </label>
              <input
                type="text"
                value={repoOwner}
                onChange={(e) => setRepoOwner(e.target.value)}
                placeholder="e.g., microsoft, facebook, your-username"
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
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333333',
                fontWeight: 'bold'
              }}>
                Repository Name:
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="e.g., react, create-react-app, my-project"
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
            </div>
          </>
        )}

        {/* Toggle between URL and manual input */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setUseAdvanced(!useAdvanced)}
            style={{
              background: 'none',
              border: '1px solid #007bff',
              color: '#007bff',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {useAdvanced ? '← Use URL Input' : 'Manual Input →'}
          </button>
        </div>

        {/* Preview of parsed values when using URL */}
        {!useAdvanced && repoOwner && repoName && (
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#e7f3ff',
            border: '1px solid #b3d9ff',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            <strong style={{ color: '#0066cc' }}>Detected:</strong> 
            <span style={{ color: '#666666', fontFamily: 'monospace' }}>
              {' '}{repoOwner}/{repoName}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!useAdvanced && !repoUrl.trim()) || (useAdvanced && (!repoOwner.trim() || !repoName.trim()))}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          {loading ? 'Verifying Repository...' : 'Use This Repository'}
        </button>
      </form>

      <div style={{ 
        fontSize: '0.875rem', 
        color: '#666666', 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        border: '1px solid #ffeaa7'
      }}>
        <strong>💡 Examples:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><code>https://github.com/microsoft/vscode</code></li>
          <li><code>git@github.com:facebook/react.git</code></li>
          <li><code>https://github.com/your-username/your-repo.git</code></li>
        </ul>
      </div>
    </div>
  );
};

export default ManualRepositoryInput;
