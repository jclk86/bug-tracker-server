import { get, getById, create, update, remove } from '../model/comment';
import { checkBody, currentTimeStamp } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

// export const getAllComments = async (req: Request, res: Response): Promise<void> => {
//   const { ticketId } = req.params;

//   const isValid = isValidUUIDV4(ticketId);

//   if (!isValid) throw new CustomError(400, 'Invalid entry');
//     // ! what if ticket doesn't exist?
//   const exists = await get(ticketId);

//   if (!exists.length) throw new CustomError(400, 'No comments exist for this ticket');

// };
