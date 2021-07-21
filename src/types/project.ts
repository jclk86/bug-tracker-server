export interface BaseProject {
  name: string;
  description: string;
  start_date: string;
  completion_date: string;
  due_date: string;
  team_leader_id: string;
  project_priority_id: number;
  project_status_id: number;
}

export interface UpdateProject extends BaseProject {
  last_edited: string;
}

export interface Project extends BaseProject {
  id: string;
  date_created: string;
  company_id: string;
}

export interface ProjectUser {
  project_id: string;
  user_id: string;
}
