## Relevant Files

- `client/src/features/project_creation/components/VibeInput.tsx` - Main component for the AI-guided dialogue.
- `client/src/features/project_creation/components/SocraticChat.tsx` - Handles the conversational interface.
- `client/src/features/project_creation/utils/blueprintGenerator.ts` - Likely responsible for generating the PRD.
- `client/src/features/project_creation/components/ArtifactViewer.tsx` - Displays the generated PRD for review.
- `client/src/pages/Workspace.tsx` - Orchestrates the different phases of the application.
- `client/src/store/projectStore.ts` - Manages the state of the project and PRD.
- `server/src/main/java/com/example/demo/DemoApplication.java` - Entry point for the backend application.
- `server/src/main/resources/application.properties` - Backend configuration, potentially for GitHub API keys.

## Tasks

- [ ] 1.0 Implement User Onboarding and Project Creation
  - [ ] 1.1 Set up GitHub OAuth integration for user sign-in.
  - [ ] 1.2 Create UI for new project creation and naming.
  - [ ] 1.3 Implement backend logic for project creation and user association.
- [ ] 2.0 Develop AI-Guided Dialogue Interface
  - [ ] 2.1 Design and implement the conversational UI (chat bubbles, input field).
  - [ ] 2.2 Integrate with AI service for structured questioning.
  - [ ] 2.3 Store user responses for PRD generation.
- [ ] 3.0 Build PRD Generation and Editing Functionality
  - [ ] 3.1 Implement logic to generate PRD from collected user responses.
  - [ ] 3.2 Develop a Markdown editor component for PRD review and editing.
  - [ ] 3.3 Enable real-time preview of the Markdown.
- [ ] 4.0 Integrate GitHub Repository Creation
  - [ ] 4.1 Implement backend service to create new public GitHub repositories.
  - [ ] 4.2 Handle GitHub API authentication and error handling.
  - [ ] 4.3 Link created repository to the user's project.
- [ ] 5.0 Implement File Scaffolding and PRD Saving
  - [ ] 5.1 Create logic to scaffold `ai-artifacts` folder in the new GitHub repo.
  - [ ] 5.2 Implement functionality to save the `PRD.md` file within `ai-artifacts`.
  - [ ] 5.3 Ensure proper file encoding and formatting for Markdown.
