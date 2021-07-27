import db from '../database/config';
import { ChecklistItem, UpdateChecklistItem } from '../types/checklistItem';

export function retrieve(checklistId?: string, checklistItemId?: string): Promise<ChecklistItem[]> {
  const selector = {
    ...(checklistId && { checklist_id: checklistId }),
    ...(checklistItemId && { id: checklistItemId })
  };

  return db<ChecklistItem>('checklist_item').where(selector).returning('*');
}

export function create(checklistItem: ChecklistItem): Promise<void> {
  return db<ChecklistItem>('checklist_item').insert(checklistItem);
}

export function update(checklistItemId: string, checklistItem: UpdateChecklistItem): Promise<void> {
  const selector = { id: checklistItemId };

  return db<ChecklistItem>('checklist_item').where(selector).update(checklistItem);
}

export function remove(checklistItemId: string): Promise<void> {
  const selector = {
    id: checklistItemId
  };

  return db<ChecklistItem>('checklist_item').where(selector).delete();
}
