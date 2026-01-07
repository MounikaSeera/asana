
export const DEPARTMENTS = ['Engineering', 'Marketing', 'Operations'] as const;

export const PROJECT_TYPES = {
  Engineering: ['Sprint Board', 'Bug Tracker', 'Feature Roadmap', 'System Architecture'],
  Marketing: ['Campaign Launch', 'Content Calendar', 'Social Media Strategy', 'Brand Refresh'],
  Operations: ['Office Expansion', 'Hiring Pipeline', 'Procurement Process', 'Compliance Audit'],
};

export const SECTION_TEMPLATES = {
  Kanban: ['To Do', 'In Progress', 'Review', 'Done'],
  Bug: ['New', 'Confirmed', 'In Fix', 'Verified', 'Closed'],
  Campaign: ['Ideation', 'Asset Creation', 'Approval', 'Live', 'Reporting'],
};

export const SCHEMA_DEFINITION = `
Table: organizations
- org_id (UUID, PK)
- name (TEXT)
- domain (TEXT)

Table: teams
- team_id (UUID, PK)
- name (TEXT)
- department (TEXT)
- org_id (UUID, FK)

Table: users
- user_id (UUID, PK)
- name (TEXT)
- email (TEXT)
- role (TEXT)
- org_id (UUID, FK)

Table: team_memberships
- membership_id (UUID, PK)
- team_id (UUID, FK)
- user_id (UUID, FK)

Table: projects
- project_id (UUID, PK)
- name (TEXT)
- team_id (UUID, FK)
- owner_id (UUID, FK)

Table: sections
- section_id (UUID, PK)
- project_id (UUID, FK)
- name (TEXT)

Table: tasks
- task_id (UUID, PK)
- project_id (UUID, FK)
- section_id (UUID, FK)
- name (TEXT)
- description (TEXT)
- assignee_id (UUID, FK, NULLABLE)
- due_date (DATE, NULLABLE)
- created_at (TIMESTAMP)
- completed (BOOLEAN)
- completed_at (TIMESTAMP, NULLABLE)
- parent_task_id (UUID, FK, NULLABLE)

Table: comments
- comment_id (UUID, PK)
- task_id (UUID, FK)
- user_id (UUID, FK)
- text (TEXT)
- created_at (TIMESTAMP)
`;
