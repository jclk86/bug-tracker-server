import User from '../model/user';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.getAllUsers();
  if (!users.length) throw new CustomError(400, 'No users exist');
  res.status(200).send(users);
};
