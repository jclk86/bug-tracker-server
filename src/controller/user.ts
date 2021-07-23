import {
  retrieveByEmail,
  retrieveById,
  retrieve,
  retrieveAccountOwner,
  create,
  update,
  remove
} from '../model/user';
import { retrieveById as retrieveAccount } from '../model/account';
import { checkBody, currentTimeStamp, hashPassword, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { User, UpdateUser } from '../types/user';
import { ROLE } from '../middleware/permission/role';

//! last_active should be done on sign out

export const getAllUsersByAccountId = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId: accountId });

  const accountExists = await retrieveAccount(accountId);

  if (!accountExists) throw new CustomError(404, 'Account does not exist');

  const users = await retrieve(accountId);

  if (!users.length) throw new CustomError(404, 'Users have not been added');

  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId: userId });
  //! change to userExists
  const user = await retrieveById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { userEmail } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await retrieveByEmail(userEmail);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, roleTitle, accountId, password } = req.body;

  // hash password
  //! check what happens if no password is passed
  // ! account should be auto assigned
  const hashedPassword = await hashPassword(password);

  const signUp: User = {
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    role: roleTitle,
    password: hashedPassword,
    account_id: accountId,
    active: true,
    date_created: currentTimeStamp
  };

  await checkBody(signUp);

  const userExists = await retrieveByEmail(signUp.email);

  if (userExists) throw new CustomError(409, 'User is already registered');

  if (!signUp.role) throw new CustomError(404, 'Role does not exist');

  if (signUp.role === ROLE.OWNER) {
    // Ensures only 1 owner per account
    const owner = await retrieveAccountOwner(signUp.account_id, ROLE.OWNER);
    if (owner) throw new CustomError(409, 'Account already has owner');
  }

  await create(signUp);

  res.status(201).send(signUp);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, roleTitle, active } = req.body;

  await validateUUID({ userId: userId });

  const user = await retrieveById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  const hashedPassword = await hashPassword(password);

  // ! as a form on client side, these items will hold old values and be edited back in. So you require them here.
  const updatedUser: UpdateUser = {
    password: hashedPassword,
    email: email,
    role: roleTitle,
    active: active,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedUser);

  if (user.email !== updatedUser.email) {
    const emailExists = await retrieveByEmail(updatedUser.email);
    if (emailExists) throw new CustomError(409, 'Email already exists');
  }

  if (!updatedUser.role) throw new CustomError(400, 'Role does not exist');
  // ! we may not need this if you restrict it in front end
  if (updatedUser.role !== user.role || updatedUser.role === ROLE.OWNER)
    throw new CustomError(400, 'Can only roles between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send(updatedUser);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId: userId });

  const user = await retrieveById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  await remove(userId);

  res.status(200).send({ message: 'User was successfully deleted' });
};
