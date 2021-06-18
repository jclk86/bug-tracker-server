import { get, create, update } from '../model/checklist';
import { Checklist } from '../schema/checklist';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getChecklist = async (req: Request, res: Response): Promise<void> => {
  const { ticket_id } = req.params;

  const isValid = isValidUUIDV4(ticket_id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const checklist = await get(ticket_id);

  if (!checklist) throw new CustomError(404, 'No checklists have been added');

  res.status(200).send(checklist);
};

// only 1 checklist per ticket
export const createChecklist = async (req: Request, res: Response): Promise<void> => {
  const newChecklist: Checklist = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    completed: false,
    ticket_id: req.body.ticket_id
  };

  await util.checkBody(newChecklist);

  await create(newChecklist);

  res.status(201).send({ message: 'Checklist successfully created' });
};
