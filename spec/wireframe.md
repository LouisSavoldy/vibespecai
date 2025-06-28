# VibeSpecAI Application Wireframes

This document outlines the key wireframes for the VibeSpecAI application, showing the complete user flow from initial sign-up to iterative development.

---

## 1. Sign Up / Login Page

**Purpose:** The first entry point for all users. Simple, clean, and focused on getting the user in quickly.

```
+-----------------------------------------------------------------+
|                                                                 |
|                            VibeSpecAI                           |
|          Transform your vibe into a software spec.              |
|                                                                 |
|               +-----------------------------------+             |
|               |      [ G | Sign in with Google ]      |             |
|               +-----------------------------------+             |
|               +-----------------------------------+             |
|               |      [ H | Sign in with GitHub ]     |             |
|               +-----------------------------------+             |
|                                                                 |
|      By continuing, you agree to our Terms of Service.          |
|                                                                 |
+-----------------------------------------------------------------+
```

---

## 2. New Project Creation (The Spark)

**Purpose:** After signing in for the first time, the user is immediately prompted to start their first project, beginning the Socratic interview.

```
+-----------------------------------------------------------------+
| VibeSpecAI                                  [Alex's Account]    |
+-----------------------------------------------------------------+
|                                                                 |
|                  Welcome to VibeSpecAI, Alex!                   |
|                                                                 |
|              Let's get that brilliant idea out of               |
|                       your head and into code.                  |
|                                                                 |
|  **What's the vibe? In a sentence or two, what are you trying   |
|  to build?**                                                    |
|  +-----------------------------------------------------------+  |
|  | A cool app where plant lovers can share pictures of their   |  |
|  | plants and get care tips.                                 |  |
|  +-----------------------------------------------------------+  |
|                                                                 |
|                                [ Start Interview ]              |
|                                                                 |
+-----------------------------------------------------------------+
```

---

## 3. The Socratic Interview & Blueprint Workspace (Pre-Handoff)

**Purpose:** This is the core initial workspace. The left pane tracks progress, the center pane shows the generated artifact (like the PRD), and the right pane is for the AI chat that guides the user.

```
+--------------------------+-------------------------------------+----------------------------+
| **Project: Plantly App** | /docs/PRD.md                        | [AI Chat Agent]      (x) | 
|--------------------------|-------------------------------------|----------------------------|
| **STEP 1: The Vibe**     | [ View ] [ Edit ]                   | Great start! Now, let's    |
|   ✅ Core Idea           |-------------------------------------| think about who this is    |
|   ⏳ Target Audience     | ### Product Requirements: Plantly   | for. Is it for beginners   |
|   ⬜ Core Problem        |                                     | or expert botanists?       |
|                          | **1. Vision:** An app where...      |                            |
| **STEP 2: The Blueprint**|                                     |----------------------------|
|   ⬜ Tech Stack          | ...                                 | [Beginner] [Expert] [Both] |
|   ⬜ Features & Tasks    |                                     |                            |
|                          |                                     |                            |
| **STEP 3: The Handoff**  |                                     |                            |
|   ⬜ Sync to GitHub      |                                     |                            |
+--------------------------+-------------------------------------+----------------------------+
|                          |       [ ✅ Looks Good, Next Step ]      |                            |
+--------------------------+-------------------------------------+----------------------------+
```

---

## 4. The Handoff Instructions

**Purpose:** After the blueprint is complete and pushed to GitHub, this screen provides clear, final instructions for the user to take into their own development environment.

```
+-----------------------------------------------------------------+
| VibeSpecAI                                  [Alex's Account]    |
+-----------------------------------------------------------------+
|                                                                 |
|    🚀 **Blueprint Complete & Pushed to GitHub!** 🚀             |
|                                                                 |
|    Your project repository is ready. Here's how to start        |
|    building with your AI IDE:                                   |
|                                                                 |
|    **1. Clone your new repository:**                            |
|    `git clone https://github.com/alex/plantly-app.git`          |
|                                                                 |
|    **2. Open the folder in your AI IDE (e.g., Cursor).**        |
|                                                                 |
|    **3. Start with the first feature:**                         |
|    Open the file `/features/01_user_auth.md` and give it to     |
|    your AI assistant.                                           |
|                                                                 |
|                               [ Go to Project Workspace ]       |
|                                                                 |
+-----------------------------------------------------------------+
```

---

## 5. Project Dashboard (Multi-Project View)

**Purpose:** The main entry point for a returning user with existing projects. It allows them to open a workspace or create a new project.

```
+------------------------------------------------------------------------------------+
| VibeSpecAI                                                 [Alex's Account] [Logout] |
+------------------------------------------------------------------------------------+
|                                                                                    |
|  My Projects                                               [+ Create New Project]  |
|  +--------------------------------------------------------------------------------+  |
|  |                                                                                |  |
|  |  **Plantly App**                                                               |  |
|  |  *AI-powered plant care community*                                             |  |
|  |  Last updated: 2 days ago                      [Open Workspace] [Settings]     |  |
|  |                                                                                |  |
|  +--------------------------------------------------------------------------------+  |
|  |                                                                                |  |
|  |  **Link-in-Bio Tool**                                                          |  |
|  |  *Tutorial Project*                                                            |  |
|  |  Last updated: 1 week ago                      [Open Workspace] [Settings]     |  |
|  |                                                                                |  |
|  +--------------------------------------------------------------------------------+  |
|                                                                                    |
+------------------------------------------------------------------------------------+
```

---

## 6. The Living Workspace (Post-Handoff)

**Purpose:** The primary interface for managing a single project *after* the initial setup. It's a non-linear dashboard for iterative development.

```
+------------------------------------+-------------------------------------------+----------------------------+
| Project: Plantly App               | Welcome back, Alex!                       |                            |
|------------------------------------|-------------------------------------------|                            |
| ✅ **Initial Blueprint Complete**    | Select a file from the left to view or    |                            |
|    Synced with GitHub on Oct 27      | edit it. Or, start by adding a new        |                            |
|------------------------------------| feature.                                  |                            |
| **Project Actions:**               |                                           |                            |
|   [ ✨ Add New Feature ]           |                                           |                            |
|   [  Sync with GitHub ]          |                                           |                            |
|------------------------------------|                                           |                            |
| ▼ /docs                            |                                           |                            |
|   - PRD.md                         |                                           |                            |
| ▼ /features                        |                                           |                            |
|   - 01_user_auth.md                |                                           |                            |
|   - 02_plant_feed.md [↓]           |                                           |                            |
+------------------------------------+-------------------------------------------+----------------------------+
```

---

## 7. Editing an Existing Artifact

**Purpose:** Shows the three-pane layout when a user clicks on a file to edit it. The AI chat agent becomes a context-aware assistant.

```
+------------------------------------+-------------------------------------------+----------------------------+
| Project: Plantly App               | /docs/PRD.md  [↓]                         | [AI Chat Agent]      (x) |
|------------------------------------|-------------------------------------------|----------------------------|
| ✅ **Initial Blueprint Complete**    | [ View ] [ Edit ]                         |                            |
|------------------------------------|-------------------------------------------| I see you're looking at    |
| **Project Actions:**               | ### Product Requirements: Plantly         | the PRD. What would you    |
|   [ ✨ Add New Feature ]           |                                           | like to change or refine?  |
|   [  Sync with GitHub ]          | **1. Vision:** An app where beginners...  |                            |
| ...                                |                                           |----------------------------|
|                                    | ...                                       |                            |
+------------------------------------+-------------------------------------------+----------------------------+
|                                    |         [ ✅ Push 1 Change to GitHub ]       |                            |
+------------------------------------+-------------------------------------------+----------------------------+
```

---

## 8. Add New Feature Flow

**Purpose:** When a user clicks "Add New Feature," a focused modal appears to guide them through the Socratic interview for the new feature.

```
+------------------------------------+-------------------------------------------+
| Project: Plantly App               |  **Let's Add a New Feature**              |
|------------------------------------|-------------------------------------------|
| ✅ **Initial Blueprint Complete**    |                                           |
|------------------------------------|  Describe the new feature you want to add.| 
| **Project Actions:**               |  "I want users to be able to comment on   |
|   [ ✨ Add New Feature ] (Active)  |  each other's plant photos."              |
|   [  Sync with GitHub ]          |                                           |
| ...                                |  [ Begin Socratic Interview ]             |
+------------------------------------+-------------------------------------------+
```