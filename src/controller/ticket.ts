import {
  retrieve,
  retrieveById,
  retrieveByName,
  retrieveByProjectIdAndName,
  create,
  remove,
  update,
  retrievePriorities,
  retrieveStatuses
} from '../model/ticket';
import { retrieveById as retrieveProject } from '../model/project';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Ticket, UpdateTicket } from '../types/ticket';

export const getAllTicketsByProjectId = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  await validateUUID({ projectId });

  const projectExists = await retrieveProject(projectId);

  if (!projectExists) throw new CustomError(404, 'Project does not exist');

  const tickets = await retrieve(projectId);

  if (!tickets.length) throw new CustomError(404, 'No tickets have been added');

  res.status(200).send(tickets);
};

export const getTicketByName = async (req: Request, res: Response): Promise<void> => {
  const { ticketName } = req.params;

  const ticket = await retrieveByName(ticketName);

  if (!ticket) throw new CustomError(404, 'Ticket does not exist');

  res.status(200).send(ticket);
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  const ticket = await retrieveById(ticketId);

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

  const project = await retrieveByProjectIdAndName(newTicket.project_id, newTicket.name);

  if (project) throw new CustomError(409, 'Project already exists');

  await create(newTicket);

  res.status(201).send(newTicket);
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;
  const { name, description, ticketStatusId, ticketPriorityId, dueDate, completionDate } = req.body;

  await validateUUID({ ticketId });

  const ticket = await retrieveById(ticketId);

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
    const nameExists = await retrieveByProjectIdAndName(ticket.project_id, updatedTicket.name);
    if (nameExists) throw new CustomError(409, 'Ticket name already exists');
  }

  await update(ticketId, updatedTicket);

  res.status(201).send(updatedTicket);
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  await validateUUID({ ticketId });

  await remove(ticketId);

  res.status(200).send({ message: 'Ticket was successfully deleted' });
};
