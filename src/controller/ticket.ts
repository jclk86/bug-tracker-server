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
import { getById as getProject } from '../model/project';
import { checkBody, currentTimeStamp } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllTicketsByProjectId = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  const isValid = await isValidUUIDV4(projectId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const projectExists = await getProject(projectId);

  if (!projectExists) throw new CustomError(400, 'No such project exists');

  const tickets = await getByProjectId(projectId);

  if (!tickets.length) throw new CustomError(404, 'No tickets have been added');

  res.status(200).send(tickets);
};

export const getTicketByName = async (req: Request, res: Response): Promise<void> => {
  const { ticketName } = req.params;

  const ticket = await getByName(ticketName);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that name');

  res.status(200).send(ticket);
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  const isValid = await isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticket = await getById(ticketId);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that id');

  res.status(200).send(ticket);
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

  const newTicket = {
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

  const project = await getByProjectIdAndName(newTicket.project_id, newTicket.name);

  if (project) throw new CustomError(400, 'Please choose a different name');

  await create(newTicket);

  res.status(201).send(newTicket);
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;
  const { name, description, ticketStatusId, ticketPriorityId, dueDate, completionDate } = req.body;

  const isValid = await isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const ticket = await getById(ticketId);

  if (!ticket) throw new CustomError(400, 'No ticket exists by that id');

  const updatedTicket = {
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
    const nameExists = await getByProjectIdAndName(ticket.project_id, updatedTicket.name);
    if (nameExists) throw new CustomError(400, 'Please choose a different ticket name');
  }

  await update(ticketId, updatedTicket);

  res.status(201).send(updatedTicket);
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const { ticketId } = req.params;

  const isValid = await isValidUUIDV4(ticketId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  await removeById(ticketId);

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
