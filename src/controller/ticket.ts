import Ticket from '../model/ticket';
import util from './utilities';
import { request, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  const tickets = await Ticket.get();
  if (!tickets.length) throw new CustomError(404, 'No tickets have been added');

  res.status(200).send(tickets);
};

export const getTicketByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  const ticket = await Ticket.getByName(name);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that name');

  res.status(200).send(ticket);
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticket = await Ticket.getById(id);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that id');

  res.status(200).send(ticket);
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  const ticket = req.body;

  const newTicket = {
    id: uuidv4(),
    name: ticket.name,
    description: ticket.description,
    start_date: ticket.start_date,
    ticket_status_id: ticket.ticket_status_id,
    ticket_priority_level_id: ticket.ticket_priority_level_id,
    due_date: ticket.due_date,
    completion_date: ticket.completion_date,
    project_id: ticket.project_id
  };

  await util.checkBody(newTicket);

  const exists = await Ticket.getByName(newTicket.name);

  if (exists) throw new CustomError(400, 'Please choose a different name');

  await Ticket.create(newTicket);

  res.status(201).send({ message: 'ticket successfully created' });
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticketBody = {
    name: req.body.name,
    description: req.body.description,
    ticket_status_id: req.body.ticket_status_id,
    ticket_priority_level_id: req.body.ticket_priority_level_id,
    due_date: req.body.due_date,
    completion_date: req.body.completion_date
  };

  await util.checkBody(ticketBody);

  const ticketNameExists = await Ticket.getByName(req.body.name);

  if (ticketNameExists) throw new CustomError(400, 'Please choose different name');

  const ticketIdExists = await Ticket.getById(id);

  if (!ticketIdExists) throw new CustomError(400, 'No ticket exists by that id');

  try {
    await Ticket.update(id, ticketBody);
  } catch (e) {
    console.log(e);
  }

  res.status(201).send({ message: 'Ticket successfully updated' });
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  await Ticket.removeById(id);

  res.status(200).send({ message: 'Ticket successfully deleted' });
};
