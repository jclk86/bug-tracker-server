export interface BaseTicket {
  name: string;
  description: string;
  ticket_status_id: number;
  ticket_priority_id: number;
  due_date: string;
  completion_date: string;
}

export interface UpdateTicket extends BaseTicket {
  last_edited: string;
}

export interface Ticket extends BaseTicket {
  id: string;
  date_created: string;
  project_id: string;
}
