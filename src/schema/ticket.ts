export interface ITicket {
  id: string;
  name: string;
  description: string;
  ticket_status_id: string;
  date_created: string;
  due_date: string;
  completion_date: string;
  project_id: string;
}

export interface IUpdateTicket {
  name: string;
  description: string;
  completion_date: string;
  due_date: string;
  last_edited: string;
  ticket_priority_level_id: string;
  ticket_status_id: string;
}
