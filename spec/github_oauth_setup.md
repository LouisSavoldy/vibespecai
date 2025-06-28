# GitHub OAuth App Setup Instructions

Before your VibeSpecAI application can use GitHub OAuth for user authentication and repository interactions, you need to register it as an OAuth App within your GitHub account. This document outlines the necessary steps.

**Important:** These credentials (Client ID and Client Secret) are sensitive and must be stored securely in your application's environment variables (e.g., in a `.env` file for local development, or your deployment environment's secret management system) and **NEVER** committed to your Git repository.

---

## Steps to Register Your GitHub OAuth App

1.  **Log in to GitHub:**
    *   Go to [github.com](https://github.com/) and log in to your account.

2.  **Navigate to Developer Settings:**
    *   Click on your **profile picture** in the top right corner.
    *   Select **"Settings"** from the dropdown menu.
    *   In the left sidebar, scroll down and click on **"Developer settings"**.

3.  **Access OAuth Apps:**
    *   In the "Developer settings" sidebar, click on **"OAuth Apps"**.

4.  **Register a New OAuth App:**
    *   Click the **"New OAuth App"** button.

5.  **Fill in the Application Details:**
    You will be prompted to provide the following information. Ensure these details are accurate for your application's environment (development, staging, production).

    *   **Application name:**
        *   A descriptive name for your application (e.g., `VibeSpecAI Development`, `VibeSpecAI Production`). This name will be visible to users when they authorize your app.

    *   **Homepage URL:**
        *   The public URL of your application's homepage.
        *   For local development, this might be `http://localhost:3000` (or whatever port your frontend runs on).
        *   For a deployed application, use your actual domain (e.g., `https://app.vibespecai.com`).

    *   **Application description (optional):**
        *   A brief explanation of what your application does.

    *   **Authorization callback URL:**
        *   **This is the most critical URL.** GitHub will redirect the user to this URL after they authorize your application, and your backend will receive the authorization code here.
        *   It must precisely match the callback endpoint in your backend code.
        *   For our VibeSpecAI backend (Spring Boot), this will typically be:
            *   `http://localhost:8080/api/v1/auth/github/callback` (for local development, assuming your backend runs on port 8080)
            *   `https://your-backend-domain.com/api/v1/auth/github/callback` (for a deployed backend)

6.  **Register the Application:**
    *   Click the **"Register application"** button to complete the process.

7.  **Retrieve Client ID and Client Secret:**
    *   After registration, GitHub will display your **Client ID** and **Client Secret**.
    *   **Copy these values immediately.** The Client Secret is only shown once.
    *   **Store them securely** in your application's environment variables. For example, in your Spring Boot application, you might use `application.properties` or `application.yml` with environment variables, or a `.env` file for local development.

    Example `.env` entry (for local development, not committed to Git):
    ```
    GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxxxxx
    GITHUB_CLIENT_SECRET=sk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```

---

Once these steps are completed, your VibeSpecAI application will be able to initiate the GitHub OAuth flow and securely interact with user GitHub accounts.