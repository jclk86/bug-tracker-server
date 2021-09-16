import { retrieveAll, retrieveBy, create, update, remove } from '../model/checklist';
import { retrieveBy as retrieveTicket } from '../model/ticket';
import { checkBody, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Checklist, UpdateChecklist } from '../types/checklist';

export const getChecklists = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticket = await retrieveTicket(ticketId, null);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  const checklists = await retrieveAll(ticketId);

  if (!checklists.length)
    throw new CustomError(404, 'No checklists have been added for this ticket');

  res.status(200).send(checklists);
};

export const getChecklistById = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId });

  const checklist = await retrieveBy(checklistId, null);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  res.status(200).send(checklist);
};

export const createChecklist = async (req: Request, res: Response): Promise<void> => {
  const { name, description, ticketId } = req.body;

  const newChecklist: Checklist = {
    id: uuidv4(),
    name: name,
    description: description,
    completed: false,
    ticket_id: ticketId
  };

  await checkBody(newChecklist);

  await create(newChecklist);

  res.status(201).send(newChecklist);
};

export const updateChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;
  const { name, description, completed } = req.body;

  await validateUUID({ checklistId });

  const updatedChecklist: UpdateChecklist = {
    name: name,
    description: description,
    completed: completed
  };

  await checkBody(updatedChecklist);

  const checklist = await retrieveBy(checklistId, null);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  await update(checklistId, updatedChecklist);

  res.status(201).send(updatedChecklist);
};

export const deleteChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId });

  const checklist = await retrieveBy(checklistId, null);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  await remove(checklistId);

  res.status(200).send({ message: 'Checklist was successfully deleted' });
};
