export type Project = {
  id: string;
  name: string;
  description: string;
  date_created: string;
  start_date?: string;
  completion_date?: string;
  due_date?: string;
  team_leader_id: string;
  project_priority_id: number;
  project_status_id: number;
  company_id: string;
  last_edited?: string;
};
