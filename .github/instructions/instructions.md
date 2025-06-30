# AI Directives (`AI_DIRECTIVES.md`)

This is the "Constitution" for the VibeSpecAI project. The AI IDE must follow these rules at all times to ensure consistency, maintainability, and quality.

## 1. General Principles

*   **Adhere to the `TECH_STACK.md`:** Do not introduce new libraries or technologies without them being added to the official tech stack.
*   **Adhere to the 'instruction
*   **Language Mismatch:** The frontend is TypeScript, the backend is Java. Maintain strict typing and best practices for each language.
*   **Dry Principle (Don't Repeat Yourself):** Create reusable functions, components, and services wherever possible.
*   **Separation of Concerns:** Keep UI, business logic, and data access layers distinct.

## 2. File & Directory Structure

*   **Frontend:** Use a feature-based directory structure (e.g., `src/features/authentication`, `src/components/shared`).
*   **Backend:** Follow standard Maven project structure (`src/main/java`, `src/main/resources`). Group Java classes by feature in packages (e.g., `com.vibespecai.authentication`, `com.vibespecai.project`).
*   **Naming:** 
    *   Frontend Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
    *   Java Classes: `PascalCase.java` (e.g., `ProjectService.java`)

## 3. Coding Style

*   **Frontend Formatting:** Adhere to the configuration in the project's `.prettierrc` file.
*   **Backend Formatting:** Adhere to a standard Java style guide (e.g., Google Java Style Guide).
*   **Comments:** Add Javadoc comments to all public methods and complex logic blocks, explaining the *why*, not the *what*.

## 4. API & Data

*   **API Design:** Use RESTful principles. Endpoints should be structured as `/api/v1/resource`.
*   **Error Handling:** All API endpoints must have robust error handling and return meaningful JSON error messages using a standardized error response object.
*   **Data Access:** All database access must go through Spring Data JPA repositories. Do not write native SQL queries unless absolutely necessary for performance, and document them clearly.

## 5. Testing Strategy

*   **Mandatory Testing:** All new features must be accompanied by corresponding tests.
*   **Unit Tests:** Business logic, utility functions, and services must have unit tests (using JUnit and Mockito).
*   **Component Tests:** React components should be tested with React Testing Library to verify rendering and user interactions.
*   **API Tests:** API endpoints should have integration tests using Spring Boot's testing framework.
