# GitHub OAuth Integration Guide

## Overview
This guide explains how to use the GitHub OAuth integration for repository selection in VibeSpec AI.

## Features Implemented
✅ GitHub OAuth authentication
✅ Repository listing and creation
✅ Repository selection for artifact saving
✅ State management for selected repository
✅ User-friendly UI for repository management

## How It Works

### 1. Authentication Flow
1. User clicks "Sign in with GitHub" 
2. User is redirected to GitHub OAuth authorization
3. GitHub redirects back with authorization code
4. Backend exchanges code for access token
5. User session is established

### 2. Repository Selection Flow
1. After sign-in, user sees "Select Repository" button
2. Repository Manager shows:
   - List of user's existing public repositories
   - Option to create new repository
   - Selection interface
3. Selected repository is stored in application state
4. User can change repository selection anytime

### 3. Usage Instructions

#### Starting the Application
1. **Backend (Terminal 1):**
   ```bash
   cd server
   mvn spring-boot:run
   ```
   Backend runs on: http://localhost:8080

2. **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on: http://localhost:5175 (or next available port)

#### Using the OAuth Flow
1. Navigate to http://localhost:5175
2. Click "Sign in with GitHub"
3. Authorize VibeSpec AI on GitHub
4. Return to app as authenticated user
5. Click "Select Repository"
6. Choose existing repo or create new one
7. Selected repo is now ready for artifact operations

### 4. API Endpoints

#### Authentication
- `GET /user` - Get current user info
- `POST /logout` - Sign out user
- `GET /oauth2/authorization/github` - Start OAuth flow

#### Repository Management  
- `GET /api/repositories` - List user repositories
- `POST /api/repositories/create` - Create new repository

### 5. Frontend Components

#### App.tsx
- Main application component
- Handles authentication state
- Shows repository selection flow
- Integrates with project store

#### RepositoryManager.tsx
- Lists user repositories
- Handles repository creation
- Provides selection interface
- Communicates with backend APIs

#### Project Store
- Zustand store for state management
- Persists selected repository
- Provides repository-related actions

### 6. Security & Permissions

#### OAuth Scopes
- `public_repo` - Access to public repositories only
- This limits access to public repos for security

#### CORS Configuration
- Multiple development ports supported (5173, 5174, 5175)
- Credentials included for session management

### 7. Next Steps for Integration

#### Repository Usage
The selected repository can now be used for:
- Saving generated artifacts (PRD, schema, etc.)
- Creating project files
- Version control of VibeSpec projects

#### Example Usage in Code
```typescript
import { useProjectStore } from './store/projectStore';

function YourComponent() {
  const { selectedRepository } = useProjectStore();
  
  if (selectedRepository) {
    // Use selectedRepository.name for API calls
    // Use selectedRepository.full_name for GitHub operations
    // Use selectedRepository.html_url for links
  }
}
```

## Troubleshooting

### Common Issues
1. **Port conflicts**: Vite will automatically try next available port
2. **OAuth redirect issues**: Check GitHub App configuration
3. **CORS errors**: Ensure backend is running on port 8080

### Environment Setup
Make sure you have:
- GitHub OAuth App configured
- Client ID/Secret in `server/src/main/resources/application.properties`
- Backend running on port 8080
- Frontend running on port 5175 (or configured port)

## Development Notes

### Adding New Repository Operations
1. Add backend endpoint in `GitHubRepositoryService`
2. Add frontend API call in component
3. Update UI to handle new functionality
4. Test with selected repository

### Extending OAuth Scopes
To access private repositories:
1. Update scope to `repo` in `application.properties`
2. Update OAuth app permissions on GitHub
3. Users will see updated permission screen

The integration is now complete and ready for artifact operations!
