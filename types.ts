
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  team_id: string;
}

export interface Team {
  id: string;
  name: string;
  department: 'Engineering' | 'Marketing' | 'Operations';
}

export interface Project {
  id: string;
  name: string;
  team_id: string;
  status: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  project_id: string;
  section_id: string;
  assignee_id: string | null;
  due_date: string | null;
  created_at: string;
  completed: boolean;
  completed_at: string | null;
}

export interface Section {
  id: string;
  name: string;
  project_id: string;
}

export interface SimulationConfig {
  companyName: string;
  employeeCount: number;
  timeframeMonths: number;
}

export interface GenerationStatus {
  step: string;
  progress: number;
  logs: string[];
}
