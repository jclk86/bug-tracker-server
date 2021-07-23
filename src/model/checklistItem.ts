import db from '../database/config';
import { ChecklistItem, UpdateChecklistItem } from '../types/checklistItem';

export function retrieve(checklistId: string): Promise<ChecklistItem[]> {
  const selector = {
    checklist_id: checklistId
  };

  return db<ChecklistItem>('checklist_item').where(selector).returning('*');
}
export function retrieveById(checklistItemId: string): Promise<ChecklistItem> {
  const selector = { id: checklistItemId };

  return db<ChecklistItem>('checklist_item').where(selector).returning('*').first();
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
