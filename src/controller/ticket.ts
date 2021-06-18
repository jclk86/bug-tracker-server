import {
  getByProjectId,
  getById,
  getByName,
  getByProjectIdAndName,
  create,
  removeById,
  update,
  getPriorities,
  getStatuses
} from '../model/ticket';
import { Ticket } from '../schema/ticket';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  const { project_id } = req.params;
  const tickets = await getByProjectId(project_id);
  if (!tickets.length) throw new CustomError(404, 'No tickets have been added');

  res.status(200).send(tickets);
};

export const getTicketByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const ticket = await getByName(name);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that name');

  res.status(200).send(ticket);
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticket = await getById(id);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that id');

  res.status(200).send(ticket);
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  const ticket = req.body;

  const newTicket: Ticket = {
    id: uuidv4(),
    name: ticket.name,
    description: ticket.description,
    date_created: util.currentTimeStamp,
    ticket_status_id: ticket.ticket_status_id,
    ticket_priority_id: ticket.ticket_priority_id,
    due_date: ticket.due_date,
    completion_date: ticket.completion_date,
    project_id: ticket.project_id
  };

  await util.checkBody(newTicket);

  const exists = await getByProjectIdAndName(newTicket.project_id, newTicket.name);

  if (exists) throw new CustomError(400, 'Please choose a different name');

  await create(newTicket);

  res.status(201).send({ message: 'ticket successfully created' });
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const exists = await getById(id);

  if (!exists) throw new CustomError(400, 'No ticket exists by that id');

  const ticketBody: Partial<Ticket> = {
    name: req.body.name,
    description: req.body.description,
    ticket_status_id: req.body.ticket_status_id,
    ticket_priority_id: req.body.ticket_priority_id,
    due_date: req.body.due_date,
    completion_date: req.body.completion_date,
    last_edited: util.currentTimeStamp
  };

  await util.checkBody(ticketBody);

  if (exists.name !== ticketBody.name) {
    const nameExists = await getByProjectIdAndName(exists.project_id, ticketBody.name);
    if (nameExists) throw new CustomError(400, 'PLease choose a different ticket name');
  }

  await update(id, ticketBody);

  res.status(201).send({ message: 'Ticket successfully updated' });
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  await removeById(id);

  res.status(200).send({ message: 'Ticket successfully deleted' });
};

export const getTicketPriorities = async (req: Request, res: Response): Promise<void> => {
  const priorities = await getPriorities();

  if (!priorities.length) throw new CustomError(404, 'No ticket priorities have been added ');

  res.status(200).send(priorities);
};

export const getTicketStatuses = async (req: Request, res: Response): Promise<void> => {
  const statuses = await getStatuses();

  if (!statuses.length) throw new CustomError(404, 'No ticket statuses have been added ');

  res.status(200).send(statuses);
};
