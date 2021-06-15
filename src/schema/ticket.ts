export type Ticket = {
  id: string;
  name: string;
  description: string;
  ticket_status_id: string;
  ticket_priority_level_id: string;
  date_created: string;
  due_date: string;
  completion_date: string;
  project_id: string;
  last_edited?: string;
};
