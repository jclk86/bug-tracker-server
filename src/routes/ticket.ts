import { Router } from 'express';
import catchAsync from './utilities';
import {
  getAllTickets,
  createTicket,
  getTicketByName,
  getTicketById,
  deleteTicket,
  updateTicket
} from '../controller/ticket';

const ticketRouter = Router();

ticketRouter.get('/ticket', catchAsync(getAllTickets));

ticketRouter.get('/ticket/name/:name', catchAsync(getTicketByName));

ticketRouter.get('/ticket/id/:id', catchAsync(getTicketById));

ticketRouter.post('/ticket/create', catchAsync(createTicket));

ticketRouter.patch('/ticket/edit/:id', catchAsync(updateTicket));

ticketRouter.delete('/ticket/delete/:id', catchAsync(deleteTicket));

export default ticketRouter;
