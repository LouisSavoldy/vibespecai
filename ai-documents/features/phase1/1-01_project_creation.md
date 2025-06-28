# Feature: Project Creation & Socratic Interview

**User Story:** As a VIBE Coder, I want to be guided through a Socratic interview so that I can transform my abstract idea into a structured, actionable project blueprint.

**Related Wireframes:**
*   `/spec/wireframe.md` (Sections 2 & 3)

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
        *   Based on `projectStore.techStack` choices, `projectStore.userExperienceLevel`, and **`projectStore.architecture` preferences**,
        *   Dynamically construct the markdown content for `AI_DIRECTIVES.md`.
        *   Adjust the level of detail or specific directives based on the user's experience level (e.g., more explicit instructions for beginners).
        *   Ensure language-specific rules (e.g., Java vs. TypeScript) are correctly applied based on backend framework choice.
        *   **Incorporate directives for project structure, code style, API design, error handling, and testing philosophy based on user input.**
    *   For MVP, this will simulate saving these files to a local client-side storage (e.g., `localStorage` or an in-memory object) before the GitHub integration step. This is a placeholder for actual file system interaction.