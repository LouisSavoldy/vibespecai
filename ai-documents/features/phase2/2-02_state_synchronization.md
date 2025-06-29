# Feature: State Synchronization with GitHub

**User Story:** As a VIBE Coder, I want VibeSpecAI to periodically sync with my GitHub repository so that any changes I make directly in GitHub or through VibeSpecAI are reflected, and I can resolve conflicts.

**Related Wireframes:**
*   `/spec/wireframe.md` (Section 6: The Living Workspace - *specifically the "Sync with GitHub" action*)
*   `/ai-documents/PRD.md`

---

## Implementation Tasks:

### Task 1: Implement GitHub Polling (Backend)

*   **File:** `src/main/java/com/vibespecai/github/GitHubSyncService.java`
*   **Logic:**
    *   Create a service that can periodically (e.g., every 5 minutes, or on user request) fetch the latest commit hash for a given repository branch (e.g., `main`).
    *   Compare this hash with the last known hash stored by VibeSpecAI for that project.
    *   If there's a difference, trigger a pull of the latest files.
    *   This will require storing the last synced commit hash per project in the database.

### Task 2: Implement File Content Retrieval from GitHub (Backend)

*   **File:** `src/main/java/com/vibespecai/github/GitHubContentService.java`
*   **Logic:**
    *   Add methods to retrieve the content of specific files from a GitHub repository at a given commit hash.
    *   This will be used to pull down the latest versions of `PRD.md`, `TECH_STACK.md`, `AI_DIRECTIVES.md`, `schema.sql`, `schema-er-diagram.md`, and feature files.

### Task 3: Implement Local State Update (Frontend)

*   **File:** `src/features/state_sync/utils/localStateUpdater.ts`
*   **Logic:**
    *   When the backend detects changes and pulls new content, the frontend needs to update its local representation of the project files.
    *   This utility will take the new file contents and update the `projectStore` and any relevant local storage.

### Task 4: Implement Conflict Detection and Resolution (Frontend/Backend)

*   **File:** `src/features/state_sync/components/ConflictResolver.tsx` (Frontend UI)
*   **Logic:**
    *   When a file has been modified both locally (in VibeSpecAI) and remotely (in GitHub) since the last sync, a conflict needs to be detected.
    *   The UI should present the user with options to:
        *   Accept the remote version.
        *   Accept the local version.
        *   Manually merge (for MVP, this might be a simple text editor, or a prompt to do it in their IDE).
    *   The backend will need to support receiving conflict resolution choices and applying them to the local state before the next push.

### Task 5: Update "Sync with GitHub" UI (Frontend)

*   **File:** `src/pages/Workspace.tsx` (or a dedicated sync component)
*   **UI:** Update the "Sync with GitHub" button/indicator to show:
    *   Sync status (e.g., "Synced", "Syncing...", "Changes detected", "Conflict!").
    *   Trigger manual sync.
