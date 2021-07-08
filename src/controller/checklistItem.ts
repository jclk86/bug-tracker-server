import { getById, getByChecklistId, create, update, remove } from '../model/checklistItem';
import { getById as getChecklist } from '../model/checklist';
import { checkBody, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { ChecklistItem, UpdateChecklistItem } from '../types/checklistItem';

export const getAllChecklistItemsByChecklistId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId: checklistId });

  const checklistExists = await getChecklist(checklistId);

  if (!checklistExists) throw new CustomError(404, 'No such checklist exists');

  const checklistItems = await getByChecklistId(checklistId);

  if (!checklistItems.length) throw new CustomError(404, 'No such checklist item exists');

  res.status(200).send(checklistItems);
};

export const getChecklistItemById = async (req: Request, res: Response): Promise<void> => {
  const { checklistItemId } = req.params;

  await validateUUID({ checklistItemId: checklistItemId });

  const checklistItem = await getById(checklistItemId);

  if (!checklistItem) throw new CustomError(404, 'No such checklist item exists');

  res.status(200).send(checklistItem);
};

export const createChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const { description, checklistId } = req.body;

  const newChecklistItem: ChecklistItem = {
    id: uuidv4(),
    description: description,
    checklist_id: checklistId,
    checked: false
  };

  await checkBody(newChecklistItem);

  await create(newChecklistItem);

  res.status(201).send(newChecklistItem);
};

export const updateChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const { checklistItemId } = req.params;
  const { description, checked } = req.body;

  await validateUUID({ checklistItemId: checklistItemId });

  const updatedChecklistItem: UpdateChecklistItem = {
    description: description,
    checked: checked
  };

  await checkBody(updatedChecklistItem);

  await update(checklistItemId, updatedChecklistItem);

  res.status(201).send(updatedChecklistItem);
};

export const deleteChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const { checklistItemId } = req.params;

  await validateUUID({ checklistItemId: checklistItemId });

  const exists = await getById(checklistItemId);

  if (!exists) throw new CustomError(404, 'Checklist item does not exist');

  await remove(checklistItemId);

  res.status(200).send({ message: 'Checklist item was successfully deleted' });
};
