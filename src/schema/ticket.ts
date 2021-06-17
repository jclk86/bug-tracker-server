export type Ticket = {
  id: string;
  name: string;
  description: string;
  ticket_status_id: number;
  ticket_priority_level_id: number;
  date_created: string;
  due_date: string;
  completion_date: string;
  project_id: string;
  last_edited?: string;
};
