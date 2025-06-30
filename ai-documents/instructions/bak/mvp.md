
# AI Agent Briefing: The Minimum Viable Product (MVP)

**DOCUMENT:** `AI-CAGENT-BRIEFING-001`
**SUBJECT:** The Minimum Viable Product (MVP) Framework for Software Development
**RECIPIENT:** AI Coding Agent

---

## 1.0 Core Definition: What is an MVP?

> A **Minimum Viable Product (MVP)** is the version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least amount of effort.

Translate this into your operational parameters: An MVP is a deployable, functional software product that implements only the **absolute core features** necessary to solve a single, primary problem for a specific group of users (the "early adopters").

| Component | Description |
| :--- | :--- |
| **Minimum** | It contains the smallest possible feature set. If a feature can be removed without making the core problem unsolvable, it should be removed for the MVP. |
| **Viable** | It must be functional, reliable, and usable. The user must be able to complete the core task successfully. "Viable" means it provides real value, it's not a buggy or incomplete prototype. |
| **Product** | It is a real, shippable product, not a theoretical concept, a wireframe, or a landing page. It can be deployed to a production environment and used by real users. |

## 2.0 The Primary Objective of an MVP

Your primary objective when building an MVP is not to deliver a complete, feature-rich application. Your objective is to **facilitate a feedback loop**.

**The Loop: Build -> Measure -> Learn**

1.  **Build:** You will be tasked to implement a minimal feature set to create a functional product.
2.  **Measure:** The product is released to users. We will collect quantitative data (e.g., user engagement metrics, task completion rates) and qualitative data (e.g., user interviews, support tickets).
3.  **Learn:** This data is analyzed to validate or invalidate the core hypothesis about the user's problem. This learning directly informs the next development cycle.

Your success as an AI in building an MVP is measured by your ability to rapidly and efficiently produce a high-quality, lean product that enables this loop.

## 3.0 Distinguishing an MVP from Other Artifacts

To avoid logical errors in your implementation, differentiate the MVP from related concepts.

| It IS a... | It IS NOT a... |
| :--- | :--- |
| ✅ **Functional software that solves a core problem.** | ❌ A collection of buggy, unrelated features. |
| ✅ **A high-quality, polished version of a *few* features.** | ❌ A low-quality, "quick and dirty" version of *many* features. |
| ✅ **A tool for learning and validating a hypothesis.** | ❌ The final version 1.0 of the product. |
| ✅ **Focused on a single user journey.** | ❌ An attempt to satisfy every potential user request. |
| ✅ **The start of a journey, not the destination.** | ❌ A prototype or wireframe (an MVP is usable by end-users). |

## 4.0 Your Actionable Directives for Building an MVP

When you receive a task to build an MVP, follow these structured steps.

### 4.1 Step 1: Analyze the Core Problem and User Journey

You will be given a primary user persona and the core problem they face. Your first step is to map the **critical path user journey**. This is the simplest sequence of actions a user must take to solve their problem using the product.

-   **Example:** For a ride-sharing app MVP.
-   **Core Problem:** User needs to get from Point A to Point B.
-   **Critical Path User Journey:**
    1. User opens app and confirms pickup location (Point A).
    2. User enters destination (Point B).
    3. User requests a ride.
    4. A driver is matched and the user is notified.
    5. The user can see the driver's progress to the pickup location.
    6. The ride is completed.
    7. Payment is processed.

### 4.2 Step 2: Ruthless Feature Prioritization

You will be provided with a list of potential features. Your task is to filter this list down to the MVP set. Use the following logic:

> "Does this feature directly support the critical path user journey defined in Step 1?"

-   **If YES:** This feature is a candidate for the MVP.
-   **If NO:** This feature is **post-MVP**. Defer it.

**Example (Ride-Sharing App):**

| Feature | In Critical Path? | Decision |
| :--- | :--- | :--- |
| User Login/Authentication | YES | **INCLUDE** (Needed for security and payment) |
| Enter Destination | YES | **INCLUDE** |
| Request Ride | YES | **INCLUDE** |
| Process a single credit card | YES | **INCLUDE** (Core to payment) |
| Fare Splitting | NO | **DEFER** (A "nice-to-have," not core) |
| Scheduled Rides | NO | **DEFER** (Adds complexity, not core to immediate need) |
| Multiple Payment Options | NO | **DEFER** (One method is sufficient for viability) |
| Driver Rating System | NO | **DEFER** (Important, but not for the first ride) |
| User Profile Picture Upload | NO | **DEFER** (Not required to get from A to B) |

### 4.3 Step 3: Technical Implementation Guidelines

-   **Architecture:** Design for iteration, not for permanence. Choose a modular architecture that allows new features to be added or existing ones to be modified easily. Avoid over-engineering. Do not build complex systems for a "what-if" scenario.
-   **Code Quality:** The code for MVP features must be clean, maintainable, and well-tested (high unit/integration test coverage). "Minimum" does not mean low quality. The core must be stable.
-   **Database/Data Model:** Keep the schema as simple as possible to support the MVP features. Ensure it is extensible for future features, but do not add fields or tables "just in case."
-   **UI/UX:** The interface must be clean, intuitive, and functional. Do not spend cycles on complex animations, themes, or extensive customization. The goal is usability, not visual spectacle.
-   **Dependencies:** Use stable, well-supported libraries. Minimize the number of external dependencies to reduce complexity and security surface area.

## 5.0 Summary: Your MVP Mandate

Your mandate is to build the **smallest possible functional product** that solves a specific problem with high quality. You will be evaluated on:

1.  **Speed:** How quickly can you deliver the lean feature set?
2.  **Quality:** Is the resulting MVP stable, secure, and usable?
3.  **Focus:** Did you successfully filter out non-essential features and avoid scope creep?

By adhering to this framework, you will produce software that effectively tests business hypotheses, minimizes wasted development effort, and provides a solid foundation for future, data-driven iteration.

---
**END OF DOCUMENT**