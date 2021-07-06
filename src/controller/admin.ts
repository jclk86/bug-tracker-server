import { get, getOwners } from '../model/admin';
import { Request, Response } from 'express';
import CustomError from '../errorhandler/CustomError';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await get();

  if (!users.length) throw new CustomError(400, 'No users have been added');

  res.status(200).send(users);
};

export const getAllOwners = async (req: Request, res: Response): Promise<void> => {
  const owners = await getOwners();

  if (!owners.length) throw new CustomError(400, 'No owners have been added');

  res.status(200).send(owners);
};
