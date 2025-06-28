# Database ER Diagram for VibeSpecAI

This diagram outlines the core entities and their relationships in the VibeSpecAI database.

## Entities

### `users`
| Column       | Type                 | Constraints        | Description                               |
|--------------|----------------------|--------------------|-------------------------------------------|
| `id`         | UUID                 | PRIMARY KEY        | Unique identifier for the user            |
| `email`      | VARCHAR(255)         | UNIQUE, NOT NULL   | User's email address                      |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when the user was created       |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when the user was last updated  |

### `projects`
| Column           | Type                 | Constraints        | Description                                   |
|------------------|----------------------|--------------------|-----------------------------------------------|
| `id`             | UUID                 | PRIMARY KEY        | Unique identifier for the project             |
| `user_id`        | UUID                 | FOREIGN KEY (users.id) | ID of the user who owns this project          |
| `name`           | VARCHAR(255)         | NOT NULL           | Name of the project                           |
| `description`    | TEXT                 |                    | Detailed description of the project           |
| `github_repo_url`| VARCHAR(512)         |                    | URL to the GitHub repository for this project |
| `created_at`     | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when the project was created        |
| `updated_at`     | TIMESTAMP WITH TIME ZONE | DEFAULT CURRENT_TIMESTAMP | Timestamp when the project was last updated   |

## Relationships

*   `users` 1 -- M `projects`: One user can own multiple projects.