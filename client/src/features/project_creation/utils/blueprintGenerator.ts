import type { ProjectState, GeneratedArtifacts } from '../store/projectStore';

export const generateBlueprintFiles = (state: ProjectState): GeneratedArtifacts => {
  // --- Generate PRD Content ---
  const prd = `# Product Requirements Document

## 1. Vision & Mission
**Vision:** ${state.vibe}

## 2. The Problem Statement
**Target Audience:** ${state.targetAudience}

**Problem:** ${state.problemStatement}

## 3. Core Features (MVP)
**Key Actions:** ${Array.isArray(state.coreFeatures) ? state.coreFeatures.join(', ') : state.coreFeatures}

**Magic Moment:** ${state.magicMoment}

## 4. Technical Preferences
**Experience Level:** ${state.userExperienceLevel}
**Familiar AI IDEs:** ${state.familiarAIIDEs}

## 5. Business Model
**Monetization:** ${state.monetizationStrategy}
`;

  // --- Generate TECH_STACK.md Content ---
  const frontendFramework = state.techStack.frontendFramework === 'Recommend' ? 'React' : state.techStack.frontendFramework;
  const frontendStyling = state.techStack.frontendStyling === 'Recommend' ? 'Tailwind CSS' : state.techStack.frontendStyling;
  const backendFramework = state.techStack.backendFramework === 'Recommend' ? 'Node.js/Express' : state.techStack.backendFramework;
  const database = state.techStack.database === 'Recommend' ? 'PostgreSQL' : state.techStack.database;
  const deployment = state.techStack.deployment === 'Unsure' || !state.techStack.deployment ? 'Vercel (Frontend) and Render (Backend)' : state.techStack.deployment;

  const techStack = `# Technology Stack (\`TECH_STACK.md\`)

This document outlines the core technologies and libraries to be used for the project. The AI IDE must adhere to this stack unless a task explicitly specifies otherwise.

## Frontend

*   **Framework:** ${frontendFramework}
*   **Language:** TypeScript
*   **Styling:** ${frontendStyling}
*   **Build Tool:** Vite
*   **Testing:** Vitest + React Testing Library

## Backend

*   **Framework:** ${backendFramework}
*   **Language:** ${backendFramework.includes('Java') ? 'Java' : backendFramework.includes('Node.js') ? 'TypeScript' : backendFramework.includes('Python') ? 'Python' : 'TypeScript'}
*   **Build Tool:** ${backendFramework.includes('Spring Boot') ? 'Maven' : backendFramework.includes('Node.js') ? 'npm/yarn' : 'N/A'}
*   **Database:** ${database}

## Deployment

*   **Platforms:** ${deployment}

## Development Tools

*   **Version Control:** Git
*   **Package Manager:** npm
*   **Code Quality:** ESLint, Prettier
*   **API Documentation:** ${state.architecture.apiDesign === 'GraphQL' ? 'GraphQL Playground' : 'Swagger/OpenAPI'}
`;


  // --- Generate AI_DIRECTIVES.md Content ---
  let projectStructureDirective = '';
  const effectiveProjectStructure = state.architecture.projectStructure === 'AI Recommended' ? 'Feature-based' : state.architecture.projectStructure;
  switch (effectiveProjectStructure) {
    case 'Feature-based':
      projectStructureDirective = `## 2. File & Directory Structure\n\n*   **Frontend:** Organize code by feature. Each major feature (e.g., \`authentication\`, \`user_profile\`, \`plant_feed\`) should have its own directory containing all related components, hooks, and utilities. Shared components should reside in a \`src/shared\` directory.\n    *   Example: \`src/features/authentication/components/LoginForm.tsx\`, \`src/features/plant_feed/pages/FeedPage.tsx\`\n*   **Backend:** Organize code by domain or feature. Use packages/folders to group related controllers, services, and repositories.\n    *   Example (Java/Spring Boot): \`com.vibespecai.project.controller\`, \`com.vibespecai.project.service\`, \`com.vibespecai.project.repository\`\n`;
      break;
    case 'Layer-based':
      projectStructureDirective = `## 2. File & Directory Structure\n\n*   **Frontend:** Organize code by technical layer. Separate directories for \`components\`, \`pages\`, \`hooks\`, \`utils\`, \`services\`, etc.\n    *   Example: \`src/components/buttons/PrimaryButton.tsx\`, \`src/pages/HomePage.tsx\`\n*   **Backend:** Organize code by technical layer. Separate packages/folders for \`controllers\`, \`services\`, \`repositories\`, \`models\`, etc.\n    *   Example (Java/Spring Boot): \`com.vibespecai.controller\`, \`com.vibespecai.service\`, \`com.vibespecai.repository\`\n`;
      break;
    default:
      projectStructureDirective = `## 2. File & Directory Structure\n\n*   **Frontend:** Follow standard conventions for ${frontendFramework} projects.\n*   **Backend:** Follow standard conventions for ${backendFramework} projects.\n`;
  }

  let codeStyleDirective = '';
  const effectiveCodeStyleStrictness = state.architecture.codeStyleStrictness === 'AI Recommended' ? 'Very Strict' : state.architecture.codeStyleStrictness;
  switch (effectiveCodeStyleStrictness) {
    case 'Very Strict':
      codeStyleDirective = `## 3. Coding Style\n\n*   **Formatting:** Adhere strictly to the configuration in the project's \`.prettierrc\` (frontend) and Google Java Format (backend) or equivalent auto-formatter. Automated formatting on commit is mandatory.\n*   **Linting:** Adhere strictly to the rules in the project's \`.eslintrc.js\` (frontend) and Checkstyle/PMD/SpotBugs (backend) configurations. All new code must have zero linting errors or warnings. CI/CD pipelines will enforce this.\n*   **Comments:** Add JSDoc (frontend) or Javadoc (backend) comments to all public methods, complex logic blocks, and API endpoints, explaining the *why*, not the *what*.\n`;
      break;
    case 'Moderate':
      codeStyleDirective = `## 3. Coding Style\n\n*   **Formatting:** Use a consistent auto-formatter (e.g., Prettier, Google Java Format). Formatting issues should be addressed during code review.\n*   **Linting:** Follow linting rules as configured. Warnings should be reviewed and addressed, but may not block merges for minor issues.\n*   **Comments:** Add comments for complex logic or non-obvious code sections.\n`;
      break;
    case 'Flexible':
      codeStyleDirective = `## 3. Coding Style\n\n*   **Formatting:** Basic formatting consistency is expected. Use of an auto-formatter is recommended but not strictly enforced.\n*   **Linting:** Linting is enabled for basic error detection. Warnings are informational.\n*   **Comments:** Add comments where necessary for clarity.\n`;
      break;
    default:
      codeStyleDirective = `## 3. Coding Style\n\n*   **Formatting:** Use a consistent auto-formatter.\n*   **Linting:** Follow linting rules as configured.\n*   **Comments:** Add comments where necessary for clarity.\n`;
  }

  let apiDesignDirective = '';
  const effectiveApiDesign = state.architecture.apiDesign === 'AI Recommended' ? 'RESTful' : state.architecture.apiDesign;
  switch (effectiveApiDesign) {
    case 'RESTful':
      apiDesignDirective = `## 4. API & Data\n\n*   **API Design:** Adhere strictly to RESTful principles. Endpoints should be resource-oriented (e.g., \`/api/v1/users\`, \`/api/v1/projects\`). Use standard HTTP methods (GET, POST, PUT, DELETE) appropriately. Implement clear versioning (e.g., \`/v1/\`).\n`;
      break;
    case 'GraphQL':
      apiDesignDirective = `## 4. API & Data\n\n*   **API Design:** Implement a GraphQL API. Define a clear schema (\`schema.graphql\`) that specifies types, queries, mutations, and subscriptions. Use a single endpoint (e.g., \`/graphql\`).\n`;
      break;
    default:
      apiDesignDirective = `## 4. API & Data\n\n*   **API Design:** Follow standard API design principles.\n`;
  }

  let errorHandlingDirective = '';
  const effectiveErrorHandling = state.architecture.errorHandling === 'AI Recommended' ? 'Centralized & Detailed' : state.architecture.errorHandling;
  if (effectiveErrorHandling === 'Centralized & Detailed') {
    errorHandlingDirective = `*   **Error Handling:** Implement a centralized error handling mechanism (e.g., global exception handlers in Spring Boot, middleware in Express, React Error Boundaries). Error responses should be standardized JSON objects containing a clear message, a unique error code, and optionally, details for debugging (in development environments only). Sensitive information must never be exposed in error messages.\n*   **Logging:** Implement comprehensive logging for errors and critical events. Use a structured logging format.\n`;
  } else if (effectiveErrorHandling) {
    errorHandlingDirective = `*   **Error Handling:** ${effectiveErrorHandling}\n`;
  } else {
    errorHandlingDirective = `*   **Error Handling:** Implement appropriate error handling.\n`;
  }

  let testingPhilosophyDirective = '';
  const effectiveTestingPhilosophy = state.architecture.testingPhilosophy === 'AI Recommended' ? 'Comprehensive' : state.architecture.testingPhilosophy;
  switch (effectiveTestingPhilosophy) {
    case 'Comprehensive':
      testingPhilosophyDirective = `## 5. Testing Strategy\n\n*   **Mandatory Testing:** All new features and bug fixes must be accompanied by comprehensive tests.\n*   **Unit Tests:** Implement thorough unit tests for all business logic, utility functions, and individual components/classes. Aim for high code coverage.\n*   **Integration Tests:** Implement integration tests to verify the interaction between different modules, services, and the database. For APIs, ensure end-to-end flow testing.\n*   **Component/UI Tests:** For the frontend, use React Testing Library (or equivalent) to test component rendering, user interactions, and state changes.\n*   **Test-Driven Development (TDD):** While not strictly enforced, TDD is highly encouraged for new feature development.\n`;
      break;
    case 'TDD':
      testingPhilosophyDirective = `## 5. Testing Strategy\n\n*   **Test-Driven Development (TDD):** All new features must be developed using a strict TDD approach: write a failing test, write the minimum code to pass the test, then refactor.\n*   **Comprehensive Tests:** Ensure high unit and integration test coverage as a result of the TDD process.\n`;
      break;
    case 'Basic':
      testingPhilosophyDirective = `## 5. Testing Strategy\n\n*   **Basic Tests:** Implement essential unit tests for critical business logic and core functionalities. Integration tests are optional but recommended for complex flows.\n*   **Smoke Tests:** Ensure basic application functionality works after deployments.\n`;
      break;
    default:
      testingPhilosophyDirective = `## 5. Testing Strategy\n\n*   Implement appropriate testing for all new features.\n`;
  }

  const aiDirectives = `# AI Directives (\`AI_DIRECTIVES.md\`)\n\nThis is the "Constitution" for the project. The AI IDE must follow these rules at all times to ensure consistency, maintainability, and quality.\n\n## 1. General Principles\n\n*   **Adhere to the \`TECH_STACK.md\`:** Do not introduce new libraries or technologies without them being added to the official tech stack.\n*   **Language Mismatch:** The frontend is ${frontendFramework.includes('React') || frontendFramework.includes('Vue') || frontendFramework.includes('Angular') ? 'TypeScript' : 'N/A'}, the backend is ${backendFramework.includes('Java') ? 'Java' : backendFramework.includes('Node.js') ? 'TypeScript' : backendFramework.includes('Python') ? 'Python' : 'N/A'}. Maintain strict typing and best practices for each language.\n*   **Dry Principle (Don't Repeat Yourself):** Create reusable functions, components, and services wherever possible.\n*   **Separation of Concerns:** Keep UI, business logic, and data access layers distinct.\n\n${projectStructureDirective}\n${codeStyleDirective}\n${apiDesignDirective}\n${errorHandlingDirective}\n${testingPhilosophyDirective}\n`;

  // --- Generate schema.sql Content ---
  const schemaSql = `-- Base schema for the project...`;

  // --- Generate schema-er-diagram.md Content ---
  const schemaErDiagram = `\`\`\`mermaid\n  erDiagram\n      USER {\n          int id PK\n          string username\n          string email\n          string password_hash\n          datetime created_at\n      }\n  \`\`\``;

  return {
    'prd.md': prd,
    'tech_stack.md': techStack,
    'ai_directives.md': aiDirectives,
    'schema.sql': schemaSql,
    'schema-er-diagram.md': schemaErDiagram,
  };
};