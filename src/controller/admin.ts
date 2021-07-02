import { get, update, remove } from '../model/admin';
import { checkBody, currentTimeStamp, hashPassword } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
  const admins = await get();

  if (!admins.length) throw new CustomError(400, 'No admin accounts have been created');

  res.status(200).send(admins);
};

export const updateAdmin = async (req: Request, res: Response): Promse<void> => {
  // this needs to go through auth. The req.admin or req.role must equal admin to get here
  // Don't do this through params
};
