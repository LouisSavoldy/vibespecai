# Feature: Project Creation & Socratic Interview

**User Story:** As a VIBE Coder, I want to be guided through a Socratic interview so that I can transform my abstract idea into a structured, actionable project blueprint.

**Related Wireframes:**
*   `/spec/wireframe.md` (Sections 2 & 3)
*   `/ai-documents/PRD.md`

---

## Implementation Tasks:

### Task 1: Create the Initial Project State

*   **File:** `src/store/projectStore.ts`
*   **Logic:** Using Zustand, create a new store to manage the state of the project being created.
*   **State:** The store should hold the initial "vibe" (a string), the answers to the Socratic questions (an object), and the generated artifacts (e.g., `prd.md`, `tech_stack.md`, `ai_directives.md`, `schema.sql`, `schema-er-diagram.md`).

### Task 2: Build the Main Workspace UI

*   **File:** `src/pages/Workspace.tsx`
*   **UI:** Create a three-pane layout based on the wireframe.
    *   **Left Pane:** A static component that shows the steps of the process (e.g., "The Vibe", "The Blueprint").
    *   **Center Pane:** This will be the main content area. Initially, it should show the "What's the vibe?" input field.
    *   **Right Pane:** This will house the AI Chat Agent component.

### Task 3: Implement the "Vibe" Input

*   **File:** `src/features/project_creation/components/VibeInput.tsx`
*   **UI:** Create a simple component with a text area and a "Start Interview" button.
*   **Logic:** When the user clicks the button, the text from the text area should be saved to the `projectStore`, and the view in the center pane should change to the main artifact viewer.

### Task 4: Implement the Socratic AI Chat (Expanded Prompting Strategy)

*   **File:** `src/features/project_creation/components/SocraticChat.tsx`
*   **UI:** A basic chat interface, displaying AI questions and user input fields (text, multiple choice, etc.).
*   **Logic:** The chat will guide the user through a series of questions, progressively gathering information to populate the project blueprint. Each question aims to fill a specific section of the `PRD.md`, `TECH_STACK.md`, or other artifacts.

    *   **Initial Prompt (from Task 3's "Vibe" input):**
        *   **Question:** "What's the vibe? In a sentence or two, what are you trying to build?"
        *   **User Input:** Free-form text.
        *   **Storage:** `projectStore.vibe` (string)

    *   **Sequence 1: Target Audience & Problem Statement**
        *   **Question 1.1 (Target Audience):** "Who is this for? Is it for beginners who just bought their first succulent, or expert botanists?"
            *   **User Input:** Multiple choice (e.g., "Beginners", "Experts", "Both", "Other - please specify") or free-form text.
            *   **Storage:** `projectStore.targetAudience` (string/enum)
        *   **Question 1.2 (Core Problem):** "What's the biggest problem you're solving for them? Are they struggling to identify plants, or do they just want a community?"
            *   **User Input:** Free-form text.
            *   **Storage:** `projectStore.problemStatement` (string)

    *   **Sequence 2: Core Features (MVP)**
        *   **Question 2.1 (Key Actions):** "What are the main things you want people to be able to do? (e.g., upload a photo, browse a feed, ask a question, create a profile)."
            *   **User Input:** Selectable tags/options, allowing multiple selections.
            *   **Storage:** `projectStore.coreFeatures` (array of strings/enums)
        *   **Question 2.2 (The "Magic Moment"):** "What is the one thing a user should do to feel like your app is amazing? Is it when they get an instant ID of their plant? Or when someone comments on their photo?"
            *   **User Input:** Free-form text.
            *   **Storage:** `projectStore.magicMoment` (string)

    *   **Sequence 3: User Profile & Experience Level**
        *   **Question 3.1 (User's Software Dev Experience):** "How many years of software development experience do you have? This helps me tailor the level of detail in the instructions."
            *   **User Input:** Numeric input (e.g., 0-2, 3-5, 6+ years) or descriptive (e.g., "Beginner", "Intermediate", "Experienced").
            *   **Storage:** `projectStore.userExperienceLevel` (string/enum)
        *   **Question 3.2 (Familiar AI IDEs):** "Which AI-powered IDEs or coding assistants are you most familiar with or plan to use for this project? (e.g., VS Code with Copilot, Cursor, Windsurf, other?)"
            *   **User Input:** Multiple choice/checkboxes or free-form text.
            *   **Storage:** `projectStore.familiarAIIDEs` (array of strings)

    *   **Sequence 4: Detailed Tech Stack Choices**
        *   **Question 4.1 (Frontend Framework Preference):** "For the frontend (what users see), do you have a strong preference for a framework like React, Vue, or Angular? Or should I recommend one based on best practices?"
            *   **User Input:** Multiple choice (e.g., "React", "Vue", "Angular", "Recommend").
            *   **Storage:** `projectStore.techStack.frontendFramework` (string)
        *   **Question 4.2 (Frontend Styling):** "How do you prefer to style your frontend? (e.g., Tailwind CSS, Material-UI, custom CSS, or let me recommend?)"
            *   **User Input:** Multiple choice.
            *   **Storage:** `projectStore.techStack.frontendStyling` (string)
        *   **Question 4.3 (Backend Language/Framework Preference):** "For the backend (server-side logic), do you prefer a language/framework like Java/Spring Boot, Node.js/Express, Python/FastAPI, or should I recommend?"
            *   **User Input:** Multiple choice.
            *   **Storage:** `projectStore.techStack.backendFramework` (string)
        *   **Question 4.4 (Database Preference):** "What type of database are you most comfortable with or prefer for this project? (e.g., PostgreSQL, MySQL, MongoDB, or recommend?)"
            *   **User Input:** Multiple choice.
            *   **Storage:** `projectStore.techStack.database` (string)
        *   **Question 4.5 (Deployment Preference):** "Where do you envision deploying this application? (e.g., Vercel/Netlify for frontend, Render/AWS for backend, or unsure?)"
            *   **User Input:** Multiple choice.
            *   **Storage:** `projectStore.techStack.deployment` (object/array)

    *   **Sequence 5: Architectural & Design Preferences (NEW)**
        *   **Question 5.1 (Project Structure Philosophy):** "How would you prefer the project's code to be organized? (e.g., by feature, by layer/type, or let the AI decide?)"
            *   **User Input:** Multiple choice (e.g., "Feature-based", "Layer-based", "AI Recommended").
            *   **Storage:** `projectStore.architecture.projectStructure` (string)
        *   **Question 5.2 (Code Style Strictness):** "How strict should the code style and linting rules be? (e.g., very strict, moderate, flexible, or let the AI decide?)"
            *   **User Input:** Multiple choice (e.g., "Very Strict", "Moderate", "Flexible", "AI Recommended").
            *   **Storage:** `projectStore.architecture.codeStyleStrictness` (string)
        *   **Question 5.3 (API Design Philosophy):** "For communication between the frontend and backend, do you prefer a specific API design philosophy? (e.g., RESTful, GraphQL, or let the AI decide?)"
            *   **User Input:** Multiple choice (e.g., "RESTful", "GraphQL", "AI Recommended").
            *   **Storage:** `projectStore.architecture.apiDesign` (string)
        *   **Question 5.4 (Error Handling Approach):** "How should errors be handled and reported across the application? (e.g., centralized error handling, detailed error messages, or let the AI decide?)"
            *   **User Input:** Free-form text or multiple choice.
            *   **Storage:** `projectStore.architecture.errorHandling` (string)
        *   **Question 5.5 (Testing Philosophy):** "What's your general philosophy on testing? (e.g., Test-Driven Development (TDD), comprehensive unit/integration tests, or basic tests?)"
            *   **User Input:** Multiple choice (e.g., "TDD", "Comprehensive", "Basic").
            *   **Storage:** `projectStore.architecture.testingPhilosophy` (string)

    *   **Sequence 6: Business Model (High-Level)**
        *   **Question 6.1 (Monetization):** "How might this app ever make money? Is it a subscription for expert tips? A marketplace for plants? Or just a fun, free project?"
            *   **User Input:** Multiple choice (e.g., "Subscription", "Marketplace", "Free", "Other") or free-form text.
            *   **Storage:** `projectStore.monetizationStrategy` (string/enum)

    *   **Flow Control:**
        *   The `SocraticChat` component will maintain an internal state to track the current question index.
        *   Upon receiving a user answer, it will save the data to the `projectStore` and advance to the next question.
        *   Conditional logic will be implemented (e.g., if "Recommend" is chosen for a tech stack, the AI will provide a default recommendation and confirm).
        *   The `blueprintGenerator` (Task 6) will use these detailed answers to populate `TECH_STACK.md` and `AI_DIRECTIVES.md` more accurately.

### Task 5: Generate and Display the PRD

*   **File:** `src/features/project_creation/components/ArtifactViewer.tsx`
*   **UI:** A component that can render Markdown content.
*   **Logic:**
    *   As the user answers questions in the `SocraticChat`, this component should dynamically generate a `PRD.md` file in the background.
    *   The content of the PRD should be based on the user's answers.
    *   The rendered Markdown should be displayed in the center pane of the workspace.

### Task 6: Generate and Save Blueprint Files (Local Simulation)

*   **File:** `src/features/project_creation/utils/blueprintGenerator.ts`
*   **Logic:**
    *   Create a utility function that takes the `projectStore` data as input.
    *   This function should generate the full content for `PRD.md`, `TECH_STACK.md`, `AI_DIRECTIVES.md`, `schema.sql`, and `schema-er-diagram.md` based on the collected user input and predefined templates.
    *   **Sub-Task 6.1: Generate `TECH_STACK.md` Content:**
        *   Based on `projectStore.techStack.frontendFramework`, `projectStore.techStack.frontendStyling`, `projectStore.techStack.backendFramework`, `projectStore.techStack.database`, `projectStore.techStack.deployment`,
        *   Dynamically construct the markdown content for `TECH_STACK.md`.
        *   Use conditional logic to select appropriate libraries/tools based on user choices (e.g., if React is chosen, include Vite, Vitest, React Testing Library).
    *   **Sub-Task 6.2: Generate `AI_DIRECTIVES.md` Content:**
        *   Based on `projectStore.techStack` choices, `projectStore.userExperienceLevel`, and `projectStore.architecture` preferences,
        *   Dynamically construct the markdown content for `AI_DIRECTIVES.md`.
        *   Adjust the level of detail or specific directives based on the user's experience level (e.g., more explicit instructions for beginners).
        *   Ensure language-specific rules (e.g., Java vs. TypeScript) are correctly applied based on backend framework choice.
        *   **Detailed Directives for Architectural & Design Preferences:**
            *   **Project Structure Philosophy (`projectStore.architecture.projectStructure`):**
                *   **"Feature-based" (Default/AI Recommended):**
                    ```markdown
                    ## 2. File & Directory Structure

                    *   **Frontend:** Organize code by feature. Each major feature (e.g., `authentication`, `user_profile`, `plant_feed`) should have its own directory containing all related components, hooks, and utilities. Shared components should reside in a `src/shared` directory.
                        *   Example: `src/features/authentication/components/LoginForm.tsx`, `src/features/plant_feed/pages/FeedPage.tsx`
                    *   **Backend:** Organize code by domain or feature. Use packages/folders to group related controllers, services, and repositories.
                        *   Example (Java/Spring Boot): `com.vibespecai.project.controller`, `com.vibespecai.project.service`, `com.vibespecai.project.repository`
                    ```
                *   **"Layer-based":**
                    ```markdown
                    ## 2. File & Directory Structure

                    *   **Frontend:** Organize code by technical layer. Separate directories for `components`, `pages`, `hooks`, `utils`, `services`, etc.
                        *   Example: `src/components/buttons/PrimaryButton.tsx`, `src/pages/HomePage.tsx`
                    *   **Backend:** Organize code by technical layer. Separate packages/folders for `controllers`, `services`, `repositories`, `models`, etc.
                        *   Example (Java/Spring Boot): `com.vibespecai.controller`, `com.vibespecai.service`, `com.vibespecai.repository`
                    ```
            *   **Code Style Strictness (`projectStore.architecture.codeStyleStrictness`):**
                *   **"Very Strict" (Default/AI Recommended):**
                    ```markdown
                    ## 3. Coding Style

                    *   **Formatting:** Adhere strictly to the configuration in the project's `.prettierrc` (frontend) and Google Java Format (backend) or equivalent auto-formatter. Automated formatting on commit is mandatory.
                    *   **Linting:** Adhere strictly to the rules in the project's `.eslintrc.js` (frontend) and Checkstyle/PMD/SpotBugs (backend) configurations. All new code must have zero linting errors or warnings. CI/CD pipelines will enforce this.
                    *   **Comments:** Add JSDoc (frontend) or Javadoc (backend) comments to all public methods, complex logic blocks, and API endpoints, explaining the *why*, not the *what*.
                    ```
                *   **"Moderate":**
                    ```markdown
                    ## 3. Coding Style

                    *   **Formatting:** Use a consistent auto-formatter (e.g., Prettier, Google Java Format). Formatting issues should be addressed during code review.
                    *   **Linting:** Follow linting rules as configured. Warnings should be reviewed and addressed, but may not block merges for minor issues.
                    *   **Comments:** Add comments for complex logic or non-obvious code sections.
                    ```
                *   **"Flexible":**
                    ```markdown
                    ## 3. Coding Style

                    *   **Formatting:** Basic formatting consistency is expected. Use of an auto-formatter is recommended but not strictly enforced.
                    *   **Linting:** Linting is enabled for basic error detection. Warnings are informational.
                    *   **Comments:** Add comments where necessary for clarity.
                    ```
            *   **API Design Philosophy (`projectStore.architecture.apiDesign`):**
                *   **"RESTful" (Default/AI Recommended):**
                    ```markdown
                    ## 4. API & Data

                    *   **API Design:** Adhere strictly to RESTful principles. Endpoints should be resource-oriented (e.g., `/api/v1/users`, `/api/v1/projects`). Use standard HTTP methods (GET, POST, PUT, DELETE) appropriately. Implement clear versioning (e.g., `/v1/`).
                    *   **Error Handling:** All API endpoints must have robust, centralized error handling and return standardized JSON error responses with appropriate HTTP status codes (e.g., 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
                    ```
                *   **"GraphQL":**
                    ```markdown
                    ## 4. API & Data

                    *   **API Design:** Implement a GraphQL API. Define a clear schema (`schema.graphql`) that specifies types, queries, mutations, and subscriptions. Use a single endpoint (e.g., `/graphql`).
                    *   **Error Handling:** Handle errors within the GraphQL response structure, providing clear error messages and codes.
                    ```
            *   **Error Handling Approach (`projectStore.architecture.errorHandling`):**
                *   **Default/AI Recommended (Centralized & Detailed):**
                    ```markdown
                    ## 4. API & Data (continued)

                    *   **Error Handling:** Implement a centralized error handling mechanism (e.g., global exception handlers in Spring Boot, middleware in Express, React Error Boundaries). Error responses should be standardized JSON objects containing a clear message, a unique error code, and optionally, details for debugging (in development environments only). Sensitive information must never be exposed in error messages.
                    *   **Logging:** Implement comprehensive logging for errors and critical events. Use a structured logging format.
                    ```
                *   **User-defined (Free-form text):** The user's input will be directly incorporated here, potentially with AI refinement for clarity.
            *   **Testing Philosophy (`projectStore.architecture.testingPhilosophy`):**
                *   **"Comprehensive" (Default/AI Recommended):**
                    ```markdown
                    ## 5. Testing Strategy

                    *   **Mandatory Testing:** All new features and bug fixes must be accompanied by comprehensive tests.
                    *   **Unit Tests:** Implement thorough unit tests for all business logic, utility functions, and individual components/classes. Aim for high code coverage.
                    *   **Integration Tests:** Implement integration tests to verify the interaction between different modules, services, and the database. For APIs, ensure end-to-end flow testing.
                    *   **Component/UI Tests:** For the frontend, use React Testing Library (or equivalent) to test component rendering, user interactions, and state changes.
                    *   **Test-Driven Development (TDD):** While not strictly enforced, TDD is highly encouraged for new feature development.
                    ```
                *   **"TDD":**
                    ```markdown
                    ## 5. Testing Strategy

                    *   **Test-Driven Development (TDD):** All new features must be developed using a strict TDD approach: write a failing test, write the minimum code to pass the test, then refactor.
                    *   **Comprehensive Tests:** Ensure high unit and integration test coverage as a result of the TDD process.
                    ```
                *   **"Basic":**
                    ```markdown
                    ## 5. Testing Strategy

                    *   **Basic Tests:** Implement essential unit tests for critical business logic and core functionalities. Integration tests are optional but recommended for complex flows.
                    *   **Smoke Tests:** Ensure basic application functionality works after deployments.
                    ```
    *   For MVP, this will simulate saving these files to a local client-side storage (e.g., `localStorage` or an in-memory object) before the GitHub integration step. This is a placeholder for actual file system interaction.
