import { getById, getByChecklistId, create, update, remove } from '../model/checklistItem';
import { getById as getChecklist } from '../model/checklist';
import { ChecklistItem } from '../schema/checklistItem';
import { checkBody } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllChecklistItemsByChecklistId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { checklistId } = req.params;

  const isValid = isValidUUIDV4(checklistId);

  if (!isValid) throw new CustomError(400, 'Invalid checklist id');

  const checklistExists = await getChecklist(checklistId);

  if (!checklistExists) throw new CustomError(400, 'No such checklist exists');

  const checklistItems = await getByChecklistId(checklistId);

  if (!checklistItems.length) throw new CustomError(400, 'No such checklist item exists');

  res.status(200).send(checklistItems);
};

export const getChecklistItemById = async (req: Request, res: Response): Promise<void> => {
  const { checklistItemId } = req.params;

  const isValid = isValidUUIDV4(checklistItemId);

  if (!isValid) throw new CustomError(400, 'Invalid Entry');

  const checklistItem = await getById(checklistItemId);

  if (!checklistItem) throw new CustomError(400, 'No such checklist item exists');

  res.status(200).send(checklistItem);
};

export const createChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const { description, checklistId } = req.body;

  const newChecklistItem = {
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

  const isValid = isValidUUIDV4(checklistItemId);

  if (!isValid) throw new CustomError(400, 'Invalid Entry');

  const updatedChecklistItem = {
    description: description,
    checked: checked
  };

  await checkBody(updatedChecklistItem);

  await update(checklistItemId, updatedChecklistItem);

  res.status(201).send(updatedChecklistItem);
};

export const deleteChecklistItem = async (req: Request, res: Response): Promise<void> => {
  const { checklistItemId } = req.params;

  const isValid = isValidUUIDV4(checklistItemId);

  if (!isValid) throw new CustomError(400, 'Invalid Entry');

  const exists = await getById(checklistItemId);

  if (!exists) throw new CustomError(400, 'Checklist item does not exist');

  await remove(checklistItemId);

  res.status(200).send({ message: 'Checklist item deleted' });
};
