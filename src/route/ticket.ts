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
import { requireAuth } from '../middleware/jwtAuth';

const ticketRouter = Router();

ticketRouter.all('/ticket', catchAsync(requireAuth));

ticketRouter.get('/ticket/project/:projectId', catchAsync(getAllTicketsByProjectId));

ticketRouter.get('/ticket/name/:ticketName', catchAsync(getTicketByName));

ticketRouter.get('/ticket/priorities', catchAsync(getTicketPriorities));

ticketRouter.get('/ticket/statuses', catchAsync(getTicketStatuses));

ticketRouter.get('/ticket/:ticketId', catchAsync(getTicketById));

ticketRouter.post('/ticket', catchAsync(createTicket));

ticketRouter.patch('/ticket/:ticketId', catchAsync(updateTicket));

ticketRouter.delete('/ticket/:ticketId', catchAsync(deleteTicket));

export default ticketRouter;
