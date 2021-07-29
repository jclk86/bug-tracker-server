import {
  retrieve,
  create,
  remove,
  update,
  retrievePriorities,
  retrieveStatuses
} from '../model/ticket';
import { retrieve as retrieveProject } from '../model/project';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Ticket, UpdateTicket } from '../types/ticket';

export const getTickets = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId });

  const project = await retrieveProject(null, projectId, null);

  if (!project) throw new CustomError(404, 'Project does not exist');

  const tickets = await retrieve(projectId, null, null);

  if (!tickets.length) throw new CustomError(404, 'No tickets have been added');

  res.status(200).send(tickets);
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticket = await retrieve(null, ticketId, null);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  res.status(200).send(ticket);
};

export const getTicketByName = async (req: Request, res: Response): Promise<void> => {
  const { ticketName } = req.params;

  const ticket = await retrieve(null, null, ticketName);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  res.status(200).send(ticket);
};

export const getTicketPriorities = async (req: Request, res: Response): Promise<void> => {
  const priorities = await retrievePriorities();

  if (!priorities.length) throw new CustomError(404, 'No ticket priorities have been added ');

  res.status(200).send(priorities);
};

export const getTicketStatuses = async (req: Request, res: Response): Promise<void> => {
  const statuses = await retrieveStatuses();

  if (!statuses.length) throw new CustomError(404, 'No ticket statuses have been added ');

  res.status(200).send(statuses);
};

// ! auto assign project id
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    description,
    ticketStatusId,
    ticketPriorityId,
    dueDate,
    completionDate,
    projectId
  } = req.body;

  const newTicket: Ticket = {
    id: uuidv4(),
    name: name,
    description: description,
    date_created: currentTimeStamp,
    ticket_status_id: ticketStatusId,
    ticket_priority_id: ticketPriorityId,
    due_date: dueDate,
    completion_date: completionDate,
    project_id: projectId
  };

  await checkBody(newTicket);

  const ticketNameExists = await retrieve(newTicket.project_id, null, newTicket.name);

  if (ticketNameExists) throw new CustomError(409, 'Ticket already exists');

  await create(newTicket);

  res.status(201).send(newTicket);
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;
  const { name, description, ticketStatusId, ticketPriorityId, dueDate, completionDate } = req.body;

  await validateUUID({ ticketId });

  const ticket = await retrieve(null, ticketId, null);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  const updatedTicket: UpdateTicket = {
    name: name,
    description: description,
    ticket_status_id: ticketStatusId,
    ticket_priority_id: ticketPriorityId,
    due_date: dueDate,
    completion_date: completionDate,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedTicket);

  if (ticket.name !== updatedTicket.name) {
    const ticketNameExists = await retrieve(ticket.project_id, null, updatedTicket.name);
    if (ticketNameExists) throw new CustomError(409, 'Ticket name already exists');
  }

  await update(ticketId, updatedTicket);

  res.status(201).send(updatedTicket);
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticket = await retrieve(null, ticketId, null);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  await remove(ticketId);

  res.status(200).send({ message: 'Ticket was successfully deleted' });
};
