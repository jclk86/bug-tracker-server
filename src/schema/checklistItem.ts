export interface BaseChecklistItem {
  description: string;
  checked: boolean;
}

export type UpdateChecklist = BaseChecklistItem;

export interface Checklist extends BaseChecklistItem {
  id: string;
  checklist_id: string;
}
