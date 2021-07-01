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
import { Checklist } from '../schema/checklist';
import { checkBody } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllChecklistsByTicketId = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  const isValid = await isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticketExists = await getTicket(ticketId);

  if (!ticketExists) throw new CustomError(400, 'No such ticket exists');

  const checklists = await getByTicketId(ticketId);

  if (!checklists.length) throw new CustomError(400, 'No checklists exist for this ticket');

  res.status(200).send(checklists);
};

export const getChecklistById = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  const isValid = await isValidUUIDV4(checklistId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const checklist = await get(checklistId);

  if (!checklist) throw new CustomError(404, 'No such checklist exists');

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

  if (nameExists)
    throw new CustomError(400, 'Checklist name already exists. Please choose a different name.');

  await create(newChecklist);

  res.status(201).send(newChecklist);
};

export const updateChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  const isValid = await isValidUUIDV4(checklistId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const updatedChecklist = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };

  await checkBody(updatedChecklist);

  // we need the checklist id to edit the checklist - test out
  // ! test out
  const checklist = await getById(checklistId);

  if (!checklist) throw new CustomError(400, 'Checklist does not exist');

  if (checklist.name !== updatedChecklist.name) {
    const nameExists = await getByTicketIdAndName(checklist.ticket_id, updatedChecklist.name);
    if (nameExists) throw new CustomError(400, 'Checklist name already exists');
  }

  await update(checklistId, updatedChecklist);

  res.status(201).send(updatedChecklist);
};

export const deleteChecklist = async (req: Request, res: Response): Promise<void> => {
  const { checklistId } = req.params;

  const isValid = await isValidUUIDV4(checklistId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const checklist = await getById(checklistId);

  if (!checklist) throw new CustomError(400, 'Checklist does not exist');

  await remove(checklistId);

  res.status(200).send({ message: 'Checklist successfully deleted' });
};
