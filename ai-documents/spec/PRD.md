# Product Requirements Document: VibeSpecAI (Version 1.1)

**Version:** 1.1
**Status:** Ready for Development

## 1. Vision & Mission

**Vision:** To empower the next generation of creators, thinkers, and "VIBE coders" to transform their ideas into working software without the traditional barriers of software engineering complexity.

**Mission:** VibeSpecAI is an AI-driven SaaS tool that acts as an intelligent project architect. It partners with entry-level developers to translate their abstract vision into a complete set of structured, high-quality specifications and instructions, ready for execution by modern AI IDEs.

## 2. The Problem Statement

The rise of powerful AI IDEs has not solved the foundational problem of what code to write. VibeSpecAI solves this by addressing challenges for both the developer and their AI assistant:

**For the VIBE Coder:**

*   **The "Blank Page" Problem:** Translating a "vibe" into an actionable plan.
*   **Architectural Fragility:** Building an MVP that requires major, demotivating refactoring for V2.
*   **Integration & Deployment Anxiety:** Fear of complex third-party services and the "go-live" process.
*   **Local Environment Hell:** Getting stuck on installation and setup before even starting the project.

**For the AI IDE:**

*   **Lack of Context:** Receiving one-off prompts without understanding the project's overall goals or rules.
*   **Inconsistent Instructions:** Generating code that lacks a unified style or architectural pattern.

## 3. Target Audience & Personas

### 3.1. Primary Persona: "Alex, the VIBE Coder"

*   **Who is Alex?** A creative, motivated individual who is technically curious but not formally trained in software engineering.
*   **Goals:** Wants to build a web app for a side project or startup MVP and is excited by the potential of AI coding tools.
*   **Pain Points:** Gets overwhelmed by technical jargon, architectural decisions, and the setup process.

### 3.2. Non-Goals & Negative Persona: "Sam, the Senior Engineer"

*   **Who is Sam?** A professional software engineer with 10+ years of experience, comfortable with complex command-line tools and bespoke architectures.
*   **Why is VibeSpecAI not for Sam?** Sam would find the tool's guided, opinionated nature restrictive. VibeSpecAI prioritizes simplicity and best-practice defaults over the infinite, fine-grained customizability that a senior engineer requires.

## 4. Core Product Principles

*   **Socratic Dialogue, Not Interrogation:** A patient, guiding partner that explores the user's idea.
*   **Architect for Today, Plan for Tomorrow:** Ruthlessly prioritize the MVP while strategically laying a foundation for future features.
*   **Git as the Single Source of Truth:** VibeSpecAI is the "brain," but Git is the "book."
*   **Human-in-the-Loop:** Automate the tedious, but orchestrate the essential human decisions.
*   **Opinionated by Default, Flexible by Choice:** Recommend best-in-class solutions but allow overrides for knowledgeable users.
*   **Frictionless Onboarding & Progressive Disclosure:** The user experience must be simple at the start. Complexity is only introduced when needed for a specific task to build momentum and confidence.

## 5. Business Model & Monetization

*   **Freemium Tier:** Users can create one full project for free. This includes all core features, from conception to deployment instructions, allowing them to experience the full value of VibeSpecAI without initial investment. This serves as our primary marketing and user acquisition tool.
*   **Pro Tier (Subscription):** A monthly/annual subscription will unlock:
    *   Unlimited projects.
    *   Access to advanced and specialized Integration Modules.
    *   Priority support.
*   **Tutorial Project:** Upon first login, users will be offered a guided "Tutorial Project" (e.g., a "Link-in-Bio App"). This will walk them through each key VibeSpecAI feature, teaching the core workflow in a safe, controlled environment.

## 6. MVP Definition & Phased Rollout

To ensure we build a robust and scalable application, we will release features in phases. The architecture of each phase must anticipate the needs of the next.

### Phase 1: The Minimum Viable Product (MVP)

The goal of the MVP is to validate the core hypothesis: that users will find value in a guided process that transforms an idea into a GitHub repository containing a structured project blueprint. This phase focuses solely on the generation and delivery of the project blueprint, assuming the user's development environment is already prepared.

**MVP Features:**

1.  **Core Project Creation:** The Socratic interview flow that generates the `PRD.md`, `TECH_STACK.md`, `AI_DIRECTIVES.md`, `schema.sql`, and `schema-er-diagram.md` files. (See `ai-documents/features/phase1/1-01_project_creation.md`)
2.  **GitHub Integration:** The ability to connect a GitHub account, create a new repository, and push the generated blueprint files, including the database schema files. (See `ai-documents/features/phase1/1-02_github_integration.md`)

*Wireframes (`/spec/wireframe.md`) serve as visual specifications for the UI components of this MVP phase.*

*Architectural Consideration:* The system must be designed to be stateless for the MVP, but with clear extension points for user-specific data in Phase 2.

### Phase 2: Core Product Expansion (Post-MVP)

The goal of this phase is to perfect the core single-player experience, making the blueprint a living, editable document. This phase will also see the Socratic AI chat transition from a simulated frontend experience to being powered by a real AI backend agent (e.g., Gemini 2.5), enabling more dynamic and intelligent interactions.

**Planned Features:**

1.  **AI-Assisted Editing:** The ability for a user to select any generated artifact (like the PRD or a feature file) and use a conversational AI chat to modify it. (See `project1/features/phase2/2-01_ai_assisted_editing.md`)
2.  **State Synchronization:** The ability for VibeSpecAI to periodically sync with the user's Git repo to detect changes and help resolve conflicts, ensuring the blueprint remains the source of truth. (See `project1/features/phase2/2-02_state_synchronization.md`)

*Architectural Consideration:* The backend will need a robust system for parsing, modifying, and re-serializing the markdown/YAML artifacts. The system must also be prepared to handle user-specific data.

### Phase 3: Monetization & User Management

The goal of this phase is to build a sustainable business around the validated core product.

**Planned Features:**

1.  **User Authentication:** Full sign-up, login, and user account management. The architecture from the previous phases should anticipate the need to associate projects and GitHub tokens with specific users.
2.  **Stripe Integration:** The ability for users to subscribe to a Pro Tier.

*Architectural Consideration:* The backend must be designed with a modular plugin system to easily add new third-party integrations.

### Phase 4: Future Vision: Collaboration

The goal of this phase is to expand VibeSpecAI from a single-player tool to a collaborative platform for teams.

**Planned Features:**

1.  **Team-Based Projects:** Allow multiple users to be members of a project with different permission levels (e.g., Admin, Editor, Viewer).
2.  **Real-Time Collaborative Editing:** Allow multiple users to edit the PRD and other artifacts simultaneously, seeing each other's cursors and changes in real-time.
3.  **Commenting and Discussion:** Add the ability for team members to leave comments and have discussions on specific parts of the project blueprint.

## 7. The User Journey: A Narrative Flow

*   **Phase 0: Environment Pre-flight Check (NEW)**
    *   Before project setup, VibeSpecAI provides a "Pre-flight Check." This is a diagnostic script or a manual checklist to verify that essential tools (Git, Node.js, npm/yarn) are installed on the user's machine. It links to simple installation guides to prevent early-stage frustration.
*   **Phase 1: The Spark (Project Conception)**
    *   Alex signs up and initiates the Socratic interview to define their "vibe," target audience, and core problem.
    *   The interactive "MVP Identifier" helps Alex separate core features from future goals.
    *   VibeSpecAI generates an interactive PRD. Alex can click any section to trigger a focused dialogue to refine that part.
*   **Phase 2: The Blueprint (Technical & Architectural Design)**
    *   VibeSpecAI guides Alex through selecting a Tech Stack, including a testing framework (e.g., Jest/Vitest).
    *   The "Future-Proofing Dialogue" suggests schema and component designs based on future feature goals.
    *   Artifacts are generated: PRD.md, TECH_STACK.md, `AI_DIRECTIVES.md` (now including testing rules), feature tasks, and a `.gitignore` file that automatically includes `.env`.
*   **Phase 3: The Handoff (Sync to GitHub & Begin Build)**
    *   Alex connects their GitHub account. VibeSpecAI pushes the complete project blueprint to the repository.
    *   The "IDE-Specific Onboarding" screen provides a personalized, step-by-step guide for cloning the repo and feeding the first instruction file to their chosen AI IDE (Cursor, VS Code, etc.).
*   **Phase 4: The Evolution (Iteration & Debugging)**
    *   Alex uses the context-aware "Add/Edit Feature" workflows to evolve the application.
    *   When a bug occurs, Alex uses the "AI Debugging Co-Pilot," which uses read-only GitHub access to analyze the relevant code and generate a highly specific, context-rich debugging prompt.
*   **Phase 5: The Launch (Deployment & Beyond)**
    *   The "Deployment Module" generates a human-readable guide for deploying the frontend (e.g., Vercel) and backend (e.g., Render), including instructions for setting up environment variables and automated database backups.

## 7. Detailed Feature Breakdown & Onboarding

### 7.1. Project Dashboard & User Account Management

*   A central hub to view and manage all projects.
*   Displays project health, a feed of the "Project Decision Log," and quick links to core actions.
*   Includes a "Billing" section for managing subscriptions via a Stripe customer portal.
*   Project deletion within VibeSpecAI will never delete the user's GitHub repository.

### 7.2. Core Specification Engine

*   **Socratic AI:** A conversational engine to tease out product requirements.
*   **Interactive PRD Editor:** A UI where each PRD section can be individually edited via a new conversational prompt.
*   **Feature Task Generator:** Decomposes requirements into granular tasks, including tasks for writing corresponding unit and integration tests.

### 7.3. Architectural Intelligence

*   **Tech Stack Selector:** A dual-path workflow for AI-guided recommendations or user-specified stacks.
*   **AI Directives (`AI_DIRECTIVES.md`):** The project's "constitution," defining rules for code style, libraries, and now, a mandatory testing strategy.
*   **Project Decision Log:** Automatically generated records of key architectural decisions.
*   **State Synchronization:** VibeSpecAI is designed to periodically sync with the user's Git repo to detect changes and prompt the user to resolve conflicts, ensuring the tool remains the source of truth.

### 7.4. Lifecycle & Support Tools

*   **IDE-Specific Onboarding:** Tailored guides for getting started in major AI IDEs.
*   **Enhanced AI Debugging Co-Pilot:** Uses read-only GitHub App permissions to analyze the user's actual code, generating superior debugging prompts.

### 7.5. Integration Modules

*   A framework for adding complex services. Each module includes an interview, code tasks, and a human-readable setup guide.
*   **Authentication:** Guides setup of social sign-on (Login with Google) via providers like Clerk, Auth0, or Supabase Auth.
*   **Subscriptions:** Stripe integration.
*   **Deployment:** Vercel, Render, etc., including instructions for database backups.
*   **Data Management:** Generates database seeding scripts (`prisma/seed.ts`) to populate the new application with initial data.
*   **File/Image Storage:** Cloudinary or AWS S3.
*   **Analytics & Email:** Plausible, SendGrid, etc.

## 8. Security, Permissions & Data Handling

*   **Principle of Least Privilege:** VibeSpecAI requests the minimum required GitHub scopes for its functionality (read/write access to repo files, user identity).
*   **Proactive Secret Protection:** The system automatically generates a `.gitignore` file to exclude `.env`. The UI and instructions will contain explicit, bold warnings against committing secret keys.
*   **Credential Security:** All sensitive credentials (user OAuth tokens, internal API keys) are encrypted at rest on our servers using industry-standard solutions (e.g., AWS KMS).
*   **User Data & IP:** A clear privacy policy will state that a user's project ideas and code are their own intellectual property and will not be used for model training without explicit, opt-in consent.