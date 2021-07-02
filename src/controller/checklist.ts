import {
  get,
  getById,
  getByTicketIdAndName,
  getByTicketId,
  create,
  update,
  remove
} from '../model/checklist';
import { getById as getTicket } from '../model/ticket';
import { checkBody, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorhandler/CustomError';
import { Checklist, UpdateChecklist } from '../schema/checklist';

export const getAllChecklistsByTicketId = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId: ticketId });

  const ticketExists = await getTicket(ticketId);

  if (!ticketExists) throw new CustomError(404, 'Ticket does not exist');

  const checklists = await getByTicketId(ticketId);

  if (!checklists.length)
    throw new CustomError(404, 'No checklists have been added for this ticket');

  res.status(200).send(checklists);
};

export const getChecklistById = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId: checklistId });

  const checklist = await get(checklistId);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  res.status(200).send(checklist);
};

// ! only 1 checklist per ticket?
// ! auto assign ticketId
export const createChecklist = async (req: Request, res: Response): Promise<void> => {
  const { name, description, ticketId } = req.body;

  const newChecklist: Checklist = {
    id: uuidv4(),
    name: name,
    description: description,
    completed: false, // ! should this be true? No items = completed
    ticket_id: ticketId
  };

  await checkBody(newChecklist);

  const nameExists = await getByTicketIdAndName(newChecklist.ticket_id, newChecklist.name);

  if (nameExists) throw new CustomError(409, 'Checklist name already exists');

  await create(newChecklist);

  res.status(201).send(newChecklist);
};

export const updateChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;
  const { name, description, completed } = req.body;

  await validateUUID({ checklistId: checklistId });

  const updatedChecklist: UpdateChecklist = {
    name: name,
    description: description,
    completed: completed
  };

  await checkBody(updatedChecklist);

  // we need the checklist id to edit the checklist - test out
  // ! test out
  const checklist = await getById(checklistId);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  if (checklist.name !== updatedChecklist.name) {
    const nameExists = await getByTicketIdAndName(checklist.ticket_id, updatedChecklist.name);
    if (nameExists) throw new CustomError(409, 'Checklist name already exists');
  }

  await update(checklistId, updatedChecklist);

  res.status(201).send(updatedChecklist);
};

export const deleteChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId: checklistId });

  const checklist = await getById(checklistId);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  await remove(checklistId);

  res.status(200).send({ message: 'Checklist was successfully deleted' });
};
