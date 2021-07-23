import {
  retrieve,
  retrieveById,
  retrieveByCompanyName,
  create,
  update,
  remove
} from '../model/account';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Account, UpdateAccount } from '../types/account';

// next(e): passes thrown error message to created errorhandler in app.ts. Value must be passed into next.
// Any value passed in, will pass it to errorhandler. Without a value, it wil pass to next middleware.

// this is admin controlled and owner

//! You have to define types for req.body. This should give feedback to client
// ! ensure the function names are all consistent across all controllers
//! checking project, ticket, account to see if an item exists under those
export const getAccounts = async (req: Request, res: Response): Promise<void> => {
  const companies = await retrieve();

  if (!companies?.length) throw new CustomError(404, 'Companies have not been added');

  res.status(200).send(companies);
};

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId: accountId });

  const account = await retrieveById(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  res.status(200).send(account);
};

export const getAccountByName = async (req: Request, res: Response): Promise<void> => {
  const { accountName } = req.params;

  const account = await retrieveByCompanyName(accountName);

  if (!account) throw new CustomError(404, 'account does not exist');

  res.status(200).send(account);
};

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  const newAccount: Account = {
    id: uuidv4(),
    email: email,
    company_name: name,
    date_created: currentTimeStamp
  };

  // check if all fields are filled out
  await checkBody(newAccount);

  const account = await retrieveByCompanyName(newAccount.company_name);

  if (account) throw new CustomError(409, 'Account name already exists');

  await create(newAccount);

  res.status(201).send(newAccount);
};

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;
  const { name, email } = req.body;

  await validateUUID({ accountId: accountId });

  const account = await retrieveById(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  const updatedAccount: UpdateAccount = {
    company_name: name,
    email: email,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedAccount);

  if (account.company_name !== updatedAccount.company_name) {
    const nameExists = await retrieveByCompanyName(updatedAccount.company_name);
    if (nameExists) throw new CustomError(409, 'Account name already exists');
  }

  await update(accountId, updatedAccount);

  res.status(201).send(updatedAccount);
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId: accountId });

  const account = await retrieveById(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  await remove(accountId);

  //! check if deleting a account deletes all users

  res.status(200).send({ message: 'Account was sucessfully deleted' });
};
