import { retrieve, create, update, remove } from '../model/account';
import { retrieve as retrieveUser } from '../model/user';
import { checkBody, currentTimeStamp, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { Account, UpdateAccount } from '../types/account';

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
    const companyNameExists = await retrieve(null, null, updatedAccount.company_name);
    if (companyNameExists) throw new CustomError(409, 'Account name already exists');
  } else if (account.email !== updatedAccount.email) {
    // Checks if a current account has same email
    const accountEmailExists = await retrieve(null, updatedAccount.email);
    if (accountEmailExists) throw new CustomError(409, 'Account email already exists');

    // Checks if the new email matches with an existing user
    const user = await retrieveUser(accountId, null, updatedAccount.email)[0];

    if (!user) throw new CustomError(404, 'User does not exist for this account');

    // Checks if the role is owner
    if (user.role !== 'owner')
      throw new CustomError(403, 'Non-owners cannot become account owners');
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
