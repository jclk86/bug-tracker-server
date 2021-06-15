import { get, create } from '../model/checklist';
import { Checklist } from '../schema/checklist';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllChecklists = async (req: Request, res: Response): Promise<void> => {
  const ticketId = req.params.id;
  const isValid = isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const checklist = await get(ticketId);

  if (!checklist) throw new CustomError(404, 'No checklists have been added');

  res.status(200).send(checklist);
};

export const createChecklist = async (req: Request, res: Response): Promise<void> => {
  const ticketId = req.params.id;

  const newChecklist: Checklist = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    completed: false,
    ticket_id: ticketId
  };

  await util.checkBody(newChecklist);

  await create(newChecklist);
};
