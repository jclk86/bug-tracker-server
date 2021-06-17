import { Router } from 'express';
import { catchAsync } from './utilities';
import {
  getAllTickets,
  createTicket,
  getTicketByName,
  getTicketById,
  deleteTicket,
  updateTicket,
  getTicketPriorities,
  getTicketStatuses
} from '../controller/ticket';

const ticketRouter = Router();

ticketRouter.get('/ticket', catchAsync(getAllTickets));

ticketRouter.get('/ticket/name/:name', catchAsync(getTicketByName));

ticketRouter.get('/ticket/id/:id', catchAsync(getTicketById));

ticketRouter.post('/ticket/create', catchAsync(createTicket));

ticketRouter.patch('/ticket/edit/:id', catchAsync(updateTicket));

ticketRouter.delete('/ticket/delete/:id', catchAsync(deleteTicket));

ticketRouter.get('/ticket/priorities', catchAsync(getTicketPriorities));

ticketRouter.get('/ticket/statuses', catchAsync(getTicketStatuses));

export default ticketRouter;
