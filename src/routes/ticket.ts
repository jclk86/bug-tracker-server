import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getAllTicketsByProjectId,
  createTicket,
  getTicketByName,
  getTicketById,
  deleteTicket,
  updateTicket,
  getTicketPriorities,
  getTicketStatuses
} from '../controller/ticket';

const ticketRouter = Router();

ticketRouter.get('/ticket/projectId/:projectId', catchAsync(getAllTicketsByProjectId));

ticketRouter.get('/ticket/name/:ticketName', catchAsync(getTicketByName));

ticketRouter.get('/ticket/id/:ticketId', catchAsync(getTicketById));

ticketRouter.post('/ticket/create', catchAsync(createTicket));

ticketRouter.patch('/ticket/edit/:ticketId', catchAsync(updateTicket));

ticketRouter.delete('/ticket/delete/:ticketId', catchAsync(deleteTicket));

ticketRouter.get('/ticket/priorities', catchAsync(getTicketPriorities));

ticketRouter.get('/ticket/statuses', catchAsync(getTicketStatuses));

export default ticketRouter;
