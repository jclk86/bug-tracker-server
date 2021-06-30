export interface BaseChecklist {
  name: string;
  description: string;
  completed: boolean;
}

export type UpdateChecklist = BaseChecklist;

export interface Checklist extends BaseChecklist {
  id: string;
  ticket_id: string;
}
