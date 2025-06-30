## Relevant Files

- `server/src/main/java/com/vpec/DemoApplication.java` - Main application entry point for backend.
- `server/src/main/java/com/vpec/controller/UserController.java` - Controller to handle user authentication endpoints and repository creation.
- `server/src/main/java/com/vpec/config/SecurityConfig.java` - Security configuration for OAuth2, CORS, and logout.
- `server/src/main/java/com/vpec/service/GitHubIntegrationService.java` - Service for GitHub repository creation and artifact saving.
- `client/src/App.tsx` - Main React component for frontend with GitHub sign-in flow.
- `client/src/main.tsx` - Entry point for React application.
- `server/pom.xml` - Maven configuration with OAuth2 dependencies and updated project info.
- `server/src/main/resources/application.properties` - Configuration for OAuth credentials and session management.
- `server/.env` - Environment variables for GitHub OAuth credentials.
- `server/.gitignore` - Git ignore file to protect sensitive environment variables.

## Tasks

- [x] 1.0 Set up GitHub OAuth application
  - [x] 1.1 Create a new OAuth App in GitHub developer settings.
  - [x] 1.2 Configure Redirect URI for local development and deployment.
  - [x] 1.3 Obtain Client ID and Client Secret.
- [x] 2.0 Implement backend authentication with GitHub
  - [x] 2.1 Add necessary dependencies for OAuth (e.g., Spring Security OAuth2 client).
  - [x] 2.2 Configure `application.properties` with GitHub Client ID and Secret.
  - [x] 2.3 Create a controller to handle GitHub OAuth callback.
  - [x] 2.4 Implement logic to exchange authorization code for access token.
  - [x] 2.5 Fetch user details from GitHub using the access token.
- [x] 3.0 Implement frontend sign-in flow
  - [x] 3.1 Create a "Sign in with GitHub" button/link in the React app.
  - [x] 3.2 Redirect user to GitHub authorization URL on button click.
  - [x] 3.3 Handle the redirect back from GitHub to the frontend.
- [x] 4.0 Handle user session and token management
  - [x] 4.1 Store user session information securely (e.g., using JWTs or server-side sessions).
  - [x] 4.2 Implement token refresh mechanism if necessary.
  - [x] 4.3 Secure API endpoints based on authentication status.
- [x] 5.0 Integrate with artifact saving mechanism
  - [x] 5.1 Ensure authenticated user context is available for subsequent operations (e.g., GitHub repo creation).
  - [x] 5.2 Pass necessary user/auth details to the GitHub integration service.
