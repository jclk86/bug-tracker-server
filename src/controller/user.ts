import User from '../model/user';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.get();
  if (!users.length) throw new CustomError(400, 'No users exist');
  res.status(200).send(users);
};

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await User.getByName(name);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await User.getById(id);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { user } = req.body;
};
