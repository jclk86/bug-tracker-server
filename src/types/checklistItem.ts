export interface BaseChecklistItem {
  description: string;
  checked: boolean;
}

export type UpdateChecklistItem = BaseChecklistItem;

export interface ChecklistItem extends BaseChecklistItem {
  id: string;
  checklist_id: string;
}
