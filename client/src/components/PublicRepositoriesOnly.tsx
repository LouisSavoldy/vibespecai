import React, { useState, useEffect } from 'react';
import { type Repository } from '../store/projectStore';

interface PublicRepositoriesOnlyProps {
  user: any;
  onRepositorySelected: (repository: Repository) => void;
}

const PublicRepositoriesOnly: React.FC<PublicRepositoriesOnlyProps> = ({ 
  user, 
  onRepositorySelected 
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDescription, setNewRepoDescription] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPublicRepositories();
  }, []);

  const fetchPublicRepositories = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use GitHub's public API to fetch only public repositories
      const response = await fetch(`https://api.github.com/users/${user.login}/repos?type=public&sort=updated&per_page=100`);
      
      if (response.ok) {
        const repos = await response.json();
        setRepositories(repos);
      } else {
        setError('Unable to fetch public repositories');
      }
    } catch (err) {
      setError('Error fetching repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRepository = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    setCreating(true);
    try {
      const response = await fetch('/api/repositories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newRepoName.trim(),
          description: newRepoDescription.trim() || `VibeSpec AI project: ${newRepoName}`,
          private: false // Force public for this mode
        }),
      });

      if (response.ok) {
        const newRepo = await response.json();
        onRepositorySelected(newRepo);
      } else {
        const errorData = await response.text();
        setError(`Failed to create repository: ${errorData}`);
      }
    } catch (err) {
      setError('Error creating repository');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#333333' }}>
        <div>Loading your public repositories...</div>
      </div>
    );
  }

  return (
    <div style={{ color: '#333333' }}>
      <h3 style={{ color: '#333333', marginBottom: '1rem' }}>
        🌍 Public Repositories Only
      </h3>
      <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
        Select from your public repositories or create a new public repository. 
        This option only requires minimal permissions and keeps your private repos private.
      </p>

      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#e7f3ff', 
        border: '1px solid #b3d9ff',
        borderRadius: '6px',
        marginBottom: '1.5rem'
      }}>
        <strong style={{ color: '#0066cc' }}>🔒 Privacy Benefits:</strong>
        <ul style={{ color: '#666666', marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>No access to your private repositories</li>
          <li>Uses GitHub's public API (no special permissions needed)</li>
          <li>Perfect for open-source projects</li>
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

      {/* Create New Repository Section */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h4 style={{ color: '#333333', margin: 0 }}>Create New Public Repository</h4>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showCreateForm ? 'Cancel' : '+ New Repository'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateRepository} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            padding: '1.5rem',
            backgroundColor: '#f9f9f9'
          }}>
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
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                placeholder="my-vibespec-project"
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
                Description (Optional):
              </label>
              <input
                type="text"
                value={newRepoDescription}
                onChange={(e) => setNewRepoDescription(e.target.value)}
                placeholder="A VibeSpec AI generated project"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  color: '#333333'
                }}
              />
            </div>

            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: '#856404'
            }}>
              <strong>Note:</strong> Repository will be created as public (visible to everyone)
            </div>

            <button
              type="submit"
              disabled={creating || !newRepoName.trim()}
              style={{
                backgroundColor: creating ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: creating ? 'not-allowed' : 'pointer',
                fontSize: '1rem'
              }}
            >
              {creating ? 'Creating...' : 'Create Public Repository'}
            </button>
          </form>
        )}
      </div>

      {/* Existing Public Repositories */}
      <div>
        <h4 style={{ color: '#333333', marginBottom: '1rem' }}>
          Your Public Repositories ({repositories.length})
        </h4>

        {repositories.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#666666',
            border: '1px dashed #ccc',
            borderRadius: '6px'
          }}>
            <p>No public repositories found.</p>
            <p>Create a new public repository above to get started!</p>
          </div>
        ) : (
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            border: '1px solid #e0e0e0',
            borderRadius: '6px'
          }}>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  backgroundColor: selectedRepo?.id === repo.id ? '#e7f3ff' : 'white'
                }}
                onClick={() => setSelectedRepo(repo)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ 
                      margin: 0, 
                      marginBottom: '0.5rem',
                      color: '#0366d6',
                      fontWeight: 'bold'
                    }}>
                      {repo.name}
                    </h5>
                    {repo.description && (
                      <p style={{ 
                        margin: 0, 
                        marginBottom: '0.5rem', 
                        color: '#666666',
                        fontSize: '0.875rem'
                      }}>
                        {repo.description}
                      </p>
                    )}
                    <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                      🌍 Public • Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  {selectedRepo?.id === repo.id && (
                    <div style={{ marginLeft: '1rem' }}>
                      <span style={{ 
                        color: '#28a745', 
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRepo && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              onClick={() => onRepositorySelected(selectedRepo)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Use {selectedRepo.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicRepositoriesOnly;
