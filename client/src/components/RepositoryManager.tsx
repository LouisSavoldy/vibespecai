import React, { useState, useEffect } from 'react';
import { type Repository } from '../store/projectStore';

interface RepositoryManagerProps {
  user: any;
  onRepositorySelected: (repository: Repository) => void;
}

const RepositoryManager: React.FC<RepositoryManagerProps> = ({ onRepositorySelected }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [newRepoPrivate, setNewRepoPrivate] = useState(true); // Default to private
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    console.log('📂 Fetching user repositories...');
    
    // First verify we're still authenticated
    try {
      const userCheck = await fetch('/user', {
        credentials: 'include'
      });
      
      if (!userCheck.ok) {
        console.error('❌ User not authenticated for repository fetch');
        setError('Please sign in again to access repositories');
        setLoading(false);
        return;
      }
      
      console.log('✅ User authentication verified, fetching repositories...');
    } catch (err) {
      console.error('❌ Error checking authentication:', err);
      setError('Authentication check failed');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/repositories', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Repositories fetched:', data.repositories);
        setRepositories(data.repositories || []);
      } else {
        console.error('❌ Failed to fetch repositories:', response.statusText);
        setError('Failed to fetch repositories');
      }
    } catch (err) {
      console.error('❌ Error fetching repositories:', err);
      setError('Error fetching repositories');
    } finally {
      setLoading(false);
    }
  };

  const createRepository = async () => {
    if (!newRepoName.trim()) {
      setError('Repository name is required');
      return;
    }

    console.log('🚀 Creating repository:', newRepoName);
    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/repositories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: newRepoName,
          description: newRepoDescription,
          private: newRepoPrivate
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Repository created:', data.repository);
        setNewRepoName('');
        setNewRepoDescription('');
        setNewRepoPrivate(true);
        fetchRepositories(); // Refresh the list
      } else {
        const errorData = await response.json();
        console.error('❌ Failed to create repository:', errorData);
        setError(errorData.error || 'Failed to create repository');
      }
    } catch (err) {
      console.error('❌ Error creating repository:', err);
      setError('Error creating repository');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div>Loading repositories...</div>;
  }

  return (
    <div className="repository-manager" style={{ color: '#333333' }}>
      <h3 style={{ color: '#333333', marginBottom: '0.5rem' }}>Select GitHub Repository for VibeSpec Projects</h3>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Choose an existing repository or create a new one to store your VibeSpec project artifacts (PRDs, schemas, etc.).
      </p>
      
      {error && (
        <div className="error" style={{ color: '#dc3545', marginBottom: '1rem', backgroundColor: '#f8d7da', padding: '0.75rem', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
          {error}
        </div>
      )}

      {/* Create New Repository */}
      <div className="create-repo" style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h4 style={{ color: '#333333' }}>Create New Repository</h4>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder="Repository name"
              value={newRepoName}
              onChange={(e) => setNewRepoName(e.target.value)}
              style={{ marginRight: '1rem', padding: '0.5rem', width: '200px' }}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newRepoDescription}
              onChange={(e) => setNewRepoDescription(e.target.value)}
              style={{ padding: '0.5rem', width: '250px' }}
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333333' }}>
              <input
                type="checkbox"
                checked={newRepoPrivate}
                onChange={(e) => setNewRepoPrivate(e.target.checked)}
              />
              <span>Private repository (recommended for personal projects)</span>
            </label>
          </div>
          <button
            onClick={createRepository}
            disabled={creating}
            style={{ padding: '0.5rem 1rem' }}
          >
            {creating ? 'Creating...' : 'Create Repository'}
          </button>
        </div>
      </div>

      {/* Repository List */}
      <div className="repo-list">
        <h4 style={{ color: '#333333' }}>Your Repositories ({repositories.length})</h4>
        {repositories.length === 0 ? (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px', 
            marginBottom: '1rem',
            color: '#333333',
            border: '1px solid #dee2e6'
          }}>
            <p style={{ color: '#333333', margin: '0 0 0.5rem 0' }}><strong>No repositories found.</strong></p>
            <p style={{ color: '#666666', margin: '0 0 0.5rem 0' }}>This could mean:</p>
            <ul style={{ textAlign: 'left', marginLeft: '1rem', color: '#666666' }}>
              <li>You don't have any repositories yet</li>
              <li>Your repositories are private and you need to grant access</li>
              <li>You need to refresh the page after granting permissions</li>
            </ul>
            <p style={{ color: '#333333', margin: '0.5rem 0 0 0' }}>Create a new repository above to get started!</p>
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                style={{
                  padding: '1rem',
                  margin: '0.5rem 0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ margin: 0 }}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                      {repo.private && <span style={{ marginLeft: '0.5rem', fontSize: '0.8em', color: '#666' }}>(Private)</span>}
                    </h5>
                    {repo.description && <p style={{ margin: '0.5rem 0', color: '#666' }}>{repo.description}</p>}
                    <small style={{ color: '#888' }}>
                      Updated: {new Date(repo.updated_at).toLocaleDateString()}
                    </small>
                  </div>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => onRepositorySelected(repo)}
                  >
                    Use for VibeSpec
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryManager;
