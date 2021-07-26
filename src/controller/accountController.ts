import { retrieve, create, update, remove } from '../model/account';
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

// const { checklistId } = req.params;
// // validate UUID
// if (checklistId) {
//   await utility.validateUUID({ checklistId: checklistId });
// }

// const checklistData = await checklist.get(req.accountId, checklistId || null);

// // get signup count for the checklist
// if (checklistId) {
//   checklistData.signupCount = await signup.count(req.accountId, checklistId);
// } else {
//   checklistData.forEach(async (checklist) => {
//     checklist.signupCount = await signup.count(req.accountId, checklist.id);
//   });
// }

export const getAccountById = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const account = await retrieve(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  res.status(200).send(account);
};

export const getAccountByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  const account = await retrieve(null, email);

  if (!account) throw new CustomError(404, 'Account does not exist');

  res.status(200).send(account);
};

export const getAccountByCompanyName = async (req: Request, res: Response): Promise<void> => {
  const { companyName } = req.params;

  const account = await retrieve(null, null, companyName);

  if (!account) throw new CustomError(404, 'account does not exist');

  res.status(200).send(account);
};

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  const { company_name, email } = req.body;

  const newAccount: Account = {
    id: uuidv4(),
    email: email,
    company_name: company_name,
    date_created: currentTimeStamp
  };

  // check if all fields are filled out
  await checkBody(newAccount);

  const companyNameExists = await retrieve(null, null, newAccount.company_name);

  if (companyNameExists) throw new CustomError(409, 'Account name already exists');

  const emailExists = await retrieve(null, email);

  if (emailExists) throw new CustomError(409, 'Account email already exists');

  await create(newAccount);

  res.status(201).send(newAccount);
};

export const updateAccount = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;
  const { company_name, email } = req.body;

  await validateUUID({ accountId });

  const account = await retrieve(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  const updatedAccount: UpdateAccount = {
    company_name: company_name,
    email: email,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedAccount);

  if (account.company_name !== updatedAccount.company_name) {
    const nameExists = await retrieve(null, null, updatedAccount.company_name);
    if (nameExists) throw new CustomError(409, 'Account name already exists');
  } else if (account.email !== updatedAccount.email) {
    const emailExists = await retrieve(null, updatedAccount.email);
    if (emailExists) throw new CustomError(409, 'Account email already exists');
  }

  await update(accountId, updatedAccount);

  res.status(201).send(updatedAccount);
};

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const account = await retrieve(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  await remove(accountId);

  //! check if deleting a account deletes all users

  res.status(200).send({ message: 'Account was sucessfully deleted' });
};
