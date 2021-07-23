import { retrieve, retrieveByRole } from '../model/admin';
import { Request, Response } from 'express';
import CustomError from '../errorHandler/CustomError';

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
  const accounts = await retrieve();

  if (!accounts?.length) throw new CustomError(404, 'Accounts have not been added');

  res.status(200).send(accounts);
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await retrieve();

  if (!users.length) throw new CustomError(400, 'No users have been added');

  res.status(200).send(users);
};

export const getOwners = async (req: Request, res: Response): Promise<void> => {
  const { role } = req.body;
  const owners = await retrieveByRole(role);

  if (!owners.length) throw new CustomError(400, 'No owners have been added');

  res.status(200).send(owners);
};
