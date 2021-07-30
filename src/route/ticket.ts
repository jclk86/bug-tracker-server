import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getTickets,
  createTicket,
  getTicketByName,
  getTicketById,
  deleteTicket,
  updateTicket,
  getTicketPriorities,
  getTicketStatuses
} from '../controller/ticketController';
import { requireAuth } from '../middleware/jwtAuth';

const ticketRouter = Router();

// ticketRouter.all('/ticket', catchAsync(requireAuth));

ticketRouter.get('/tickets/project/:projectId', catchAsync(getTickets));

ticketRouter.get('/ticket/name/:ticketName', catchAsync(getTicketByName));

ticketRouter.get('/ticket-priorities', catchAsync(getTicketPriorities));

ticketRouter.get('/ticket-statuses', catchAsync(getTicketStatuses));

ticketRouter.get('/ticket/:ticketId', catchAsync(getTicketById));

ticketRouter.post('/ticket', catchAsync(createTicket));

ticketRouter.patch('/ticket/:ticketId', catchAsync(updateTicket));

ticketRouter.delete('/ticket/:ticketId', catchAsync(deleteTicket));

export default ticketRouter;
