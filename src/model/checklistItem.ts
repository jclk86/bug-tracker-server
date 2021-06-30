import db from '../database/config';
import { ChecklistItem } from '../schema/checklistItem';

export function getById(checklistItemId: string): Promise<ChecklistItem> {
  const selector = { id: checklistItemId };

  return db<ChecklistItem>('checklist_item').returning('*').where(selector).first();
}
