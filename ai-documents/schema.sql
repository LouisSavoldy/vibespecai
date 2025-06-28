-- schema.sql

-- Table for Users (for future authentication and project ownership)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id), -- Link to user who owns the project
    name VARCHAR(255) NOT NULL,
    description TEXT,
    github_repo_url VARCHAR(512), -- URL to the generated GitHub repository
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_projects_user_id ON projects (user_id);
CREATE INDEX idx_users_email ON users (email);