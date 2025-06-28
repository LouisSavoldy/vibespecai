# Feature: GitHub Integration

**User Story:** As a VIBE Coder, after my project blueprint is generated, I want to connect my GitHub account and have VibeSpecAI create a new repository and push all the blueprint files to it.

**Related Wireframes:**
*   `/spec/wireframe.md` (Section 4: The Handoff Instructions - *These wireframes serve as visual guides for the UI implementation tasks below.*)

---

## Implementation Tasks:

### Task 1: Implement the GitHub OAuth Flow (Backend)

*   **File:** `src/main/java/com/vibespecai/github/GitHubController.java`
*   **Logic:**
    *   Create a `GET /api/v1/auth/github` endpoint that redirects the user to the GitHub authorization URL.
    *   Create a `GET /api/v1/auth/github/callback` endpoint that handles the callback from GitHub.
    *   This endpoint will exchange the received `code` for an access token.
    *   The access token must be securely stored, associated with the user's session or a temporary identifier for the MVP.

### Task 2: Create the "Connect to GitHub" UI (Frontend)

*   **File:** `src/features/github/components/ConnectGitHub.tsx`
*   **UI:** Create a simple component with a "Connect to GitHub" button.
*   **Logic:** When clicked, this button should navigate the user to `/api/v1/auth/github` to initiate the OAuth flow.

### Task 3: Create the GitHub Service (Backend)

*   **File:** `src/main/java/com/vibespecai/github/GitHubService.java`
*   **Logic:** This service will contain the logic for interacting with the GitHub API using the user's access token.
    *   Implement a `createRepository` method that takes a name and description and uses the GitHub API to create a new repository.
    *   Implement a `pushFileToRepo` method that takes the repository name, file path, file content, and a commit message. This method will use the GitHub API to create a new blob, create a tree, create a commit, and update the `main` branch reference.

### Task 4: Implement the "Push to GitHub" Flow (Frontend)

*   **File:** `src/features/github/components/PushToGitHub.tsx`
*   **UI:** A component that shows the status of the GitHub push (e.g., "Creating repository...", "Pushing files...", "Complete!").
*   **Logic:**
    *   After the user has authenticated with GitHub, this component should be displayed.
    *   It should make a series of API calls to the backend:
        1.  A call to an endpoint that triggers the `createRepository` method in the `GitHubService`.
        2.  For each generated artifact (`PRD.md`, `TECH_STACK.md`, `AI_DIRECTIVES.md`, `schema.sql`, `schema-er-diagram.md`, etc.), make a call to an endpoint that triggers the `pushFileToRepo` method.
    *   Update the UI to reflect the progress.
