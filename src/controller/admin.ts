import { get, update, remove } from '../model/admin';
import { checkBody, currentTimeStamp, hashPassword, validateUUID } from './utilities';
import { Request, Response } from 'express';
import CustomError from '../errorhandler/CustomError';
import { Admin, UpdateAdmin } from '../schema/admin';

export const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
  const admins = await get();

  if (!admins.length) throw new CustomError(400, 'No admin accounts have been created');

  res.status(200).send(admins);
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  // this needs to go through auth. The req.admin or req.role must equal admin to get here
  // Don't do this through params
};
