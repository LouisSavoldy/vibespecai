import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RepositorySelectionMode from './components/RepositorySelectionMode'
import GuestMode from './components/GuestMode'
import { useProjectStore, type Repository } from './store/projectStore'

interface User {
  name: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showRepositorySelection, setShowRepositorySelection] = useState(false)
  const [guestMode, setGuestMode] = useState(false)
  const [showAuthOptions, setShowAuthOptions] = useState(false)
  
  const { selectedRepository, setSelectedRepository } = useProjectStore()

  useEffect(() => {
    console.log('🔍 App mounted - checking authentication status');
    
    // Check if user was in guest mode
    const guestData = localStorage.getItem('vibespec-guest-mode');
    if (guestData) {
      console.log('👤 Found guest mode session');
      setGuestMode(true);
      setLoading(false);
      return;
    }
    
    // Check if user is already authenticated
    fetch('/user', {
      credentials: 'include'
    })
    .then(response => {
      console.log('📡 Response from /user endpoint:', response.status, response.statusText);
      if (response.ok) {
        return response.json()
      }
      throw new Error('Not authenticated')
    })
    .then(userData => {
      console.log('✅ User authenticated:', userData);
      setUser(userData)
    })
    .catch(error => {
      console.log('❌ User not authenticated:', error.message);
      // User not authenticated
      setUser(null)
    })
    .finally(() => {
      console.log('🏁 Authentication check complete');
      setLoading(false)
    })
  }, [])

  const handleSignIn = () => {
    console.log('🔑 Sign in button clicked');
    console.log('🚀 Redirecting to:', '/oauth2/authorization/github');
    window.location.href = '/oauth2/authorization/github'
  }

  const handleSignOut = async () => {
    console.log('🚪 Sign out button clicked');
    
    // Handle guest mode logout
    if (guestMode) {
      console.log('🔄 Exiting guest mode');
      setGuestMode(false);
      setSelectedRepository(null);
      setShowRepositorySelection(false);
      localStorage.removeItem('vibespec-guest-mode');
      return;
    }
    
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      
      console.log('📡 Logout response:', response.status, response.statusText);
      
      if (response.ok) {
        console.log('✅ Logout successful');
        // Clear local state
        setUser(null);
        setSelectedRepository(null);
        setShowRepositorySelection(false);
        setGuestMode(false);
        
        // Clear any stored tokens or session data
        localStorage.removeItem('vibespec-guest-mode');
        
        // Reload to ensure clean state
        window.location.reload();
      } else {
        console.error('❌ Logout failed with status:', response.status);
        // Still clear local state even if server logout failed
        setUser(null);
        setSelectedRepository(null);
        setShowRepositorySelection(false);
        setGuestMode(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Clear local state on error too
      setUser(null);
      setSelectedRepository(null);
      setShowRepositorySelection(false);
      setGuestMode(false);
      window.location.reload();
    }
  }

  const handleRepositorySelected = (repository: Repository) => {
    console.log('✅ Repository selected:', repository);
    setSelectedRepository(repository);
    setShowRepositorySelection(false);
  }

  const handleShowRepositorySelection = async () => {
    console.log('🔍 Showing repository selection - User authenticated:', !!user);
    console.log('👤 Current user:', user);
    
    // Double-check that we can access protected endpoints before showing repo manager
    try {
      console.log('🔐 Testing API access...');
      const response = await fetch('/user', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log('✅ API access confirmed:', userData);
        setShowRepositorySelection(true);
      } else {
        console.error('❌ API access failed, user needs to re-authenticate');
        alert('Please sign in again to access your repositories.');
        handleSignOut();
      }
    } catch (error) {
      console.error('❌ API test failed:', error);
      alert('Unable to verify authentication. Please sign in again.');
      handleSignOut();
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>VibeSpec AI</h1>
      
      {user || guestMode ? (
        <div className="card">
          <h2>Welcome{user ? `, ${user.name}` : ' to VibeSpec AI'}!</h2>
          
          {/* Repository Selection Flow */}
          {!selectedRepository && !showRepositorySelection && (
            <div style={{ marginBottom: '1rem' }}>
              <p>To get started, please select a repository or storage method for your VibeSpec projects:</p>
              <button onClick={handleShowRepositorySelection} className="primary-button">
                {guestMode ? 'Choose Storage Method' : 'Select Repository'}
              </button>
            </div>
          )}

          {showRepositorySelection && !guestMode && (
            <RepositorySelectionMode 
              user={user} 
              onRepositorySelected={handleRepositorySelected}
            />
          )}

          {showRepositorySelection && guestMode && (
            <GuestMode 
              onRepositorySelected={handleRepositorySelected}
              onGuestModeEnabled={() => setGuestMode(true)}
            />
          )}

          {selectedRepository && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>Selected Repository</h3>
              <div style={{ 
                padding: '1rem', 
                border: '2px solid #28a745', 
                borderRadius: '4px', 
                backgroundColor: '#f8fff8',
                marginBottom: '1rem'
              }}>
                <h4 style={{ margin: 0 }}>
                  <a href={selectedRepository.html_url} target="_blank" rel="noopener noreferrer">
                    {selectedRepository.name}
                  </a>
                </h4>
                {selectedRepository.description && (
                  <p style={{ margin: '0.5rem 0', color: '#666' }}>
                    {selectedRepository.description}
                  </p>
                )}
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={handleShowRepositorySelection} style={{ marginRight: '1rem' }}>
                    Change Repository
                  </button>
                  <button className="primary-button">
                    Start Creating Project
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <button onClick={handleSignOut}>
            {guestMode ? 'Exit Guest Mode' : 'Sign Out'}
          </button>
        </div>
      ) : (
        <div className="card">
          {!showAuthOptions ? (
            <div>
              <h2>Get Started with VibeSpec AI</h2>
              <p style={{ marginBottom: '2rem' }}>
                Choose how you'd like to use VibeSpec AI:
              </p>
              
              {/* GitHub Sign In Option */}
              <div style={{ 
                padding: '1.5rem', 
                border: '2px solid #0366d6', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                backgroundColor: '#f6f8fa'
              }}>
                <h3 style={{ marginTop: 0, color: '#0366d6' }}>
                  🐙 Sign in with GitHub (Recommended)
                </h3>
                <p style={{ color: '#666666', marginBottom: '1rem' }}>
                  Full features including repository integration, version control, and collaboration.
                  Multiple privacy options available.
                </p>
                <button onClick={handleSignIn} className="primary-button">
                  Sign in with GitHub
                </button>
              </div>

              {/* Guest Mode Option */}
              <div style={{ 
                padding: '1.5rem', 
                border: '2px solid #28a745', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                backgroundColor: '#f8fff8'
              }}>
                <h3 style={{ marginTop: 0, color: '#28a745' }}>
                  👤 Try Without Account (Guest Mode)
                </h3>
                <p style={{ color: '#666666', marginBottom: '1rem' }}>
                  No account needed. Perfect for evaluation, quick prototyping, and testing.
                  All work stays local.
                </p>
                <button 
                  onClick={() => {
                    setGuestMode(true);
                    setShowRepositorySelection(true);
                  }} 
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Start in Guest Mode
                </button>
              </div>

              <div style={{ 
                fontSize: '0.875rem', 
                color: '#666666', 
                textAlign: 'center',
                marginTop: '1.5rem'
              }}>
                <strong>Privacy First:</strong> We offer multiple options to respect your privacy preferences. 
                You can always upgrade from guest mode to a full account later.
              </div>
            </div>
          ) : (
            <div>
              <button onClick={handleSignIn}>
                Sign in with GitHub
              </button>
              <p>
                Sign in to start creating projects with VibeSpec AI
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default App
