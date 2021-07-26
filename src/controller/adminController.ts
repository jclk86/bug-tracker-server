import { retrieve } from '../model/admin';
import { Request, Response } from 'express';
import CustomError from '../errorHandler/CustomError';
import { validateUUID } from './utilities';
import { remove } from '../model/account';

export const getAccounts = async (req: Request, res: Response): Promise<void> => {
  const accounts = await retrieve();

  if (!accounts?.length) throw new CustomError(404, 'Accounts have not been added');

  res.status(200).send(accounts);
};

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  if (accountId) await validateUUID({ accountId });

  const account = await retrieve(accountId)[0];

  if (!account) throw new CustomError(404, 'Account does not exist');

  res.status(200).send(account);
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const account = await retrieve(accountId)[0];

  if (!account) throw new CustomError(404, 'Account does not exist');

  await remove(accountId);

  res.status(200).send({ message: 'Account successfully deleted' });
};
