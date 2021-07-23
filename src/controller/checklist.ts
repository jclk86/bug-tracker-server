import {
  retrieve,
  retrieveById,
  retrieveByTicketIdAndName,
  create,
  update,
  remove
} from '../model/checklist';
import { retrieveById as retrieveTicket } from '../model/ticket';
import { checkBody, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Checklist, UpdateChecklist } from '../types/checklist';

export const getChecklists = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticketExists = await retrieveTicket(ticketId);

  if (!ticketExists) throw new CustomError(404, 'Ticket does not exist');

  const checklists = await retrieve(ticketId);

  if (!checklists.length)
    throw new CustomError(404, 'No checklists have been added for this ticket');

  res.status(200).send(checklists);
};

export const getChecklistById = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId });

  const checklist = await retrieveById(checklistId);

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

  const nameExists = await retrieveByTicketIdAndName(newChecklist.ticket_id, newChecklist.name);

  if (nameExists) throw new CustomError(409, 'Checklist name already exists');

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

  const checklist = await retrieveById(checklistId);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  if (checklist.name !== updatedChecklist.name) {
    const nameExists = await retrieveByTicketIdAndName(checklist.ticket_id, updatedChecklist.name);
    if (nameExists) throw new CustomError(409, 'Checklist name already exists');
  }

  await update(checklistId, updatedChecklist);

  res.status(201).send(updatedChecklist);
};

export const deleteChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  await validateUUID({ checklistId });

  const checklist = await retrieveById(checklistId);

  if (!checklist) throw new CustomError(404, 'Checklist does not exist');

  await remove(checklistId);

  res.status(200).send({ message: 'Checklist was successfully deleted' });
};
