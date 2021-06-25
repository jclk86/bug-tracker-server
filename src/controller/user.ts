import {
  get,
  getByEmail,
  getById,
  getByCompanyId,
  getAccountOwner,
  create,
  update,
  removeById
} from '../model/user';
import { BaseUser, User } from '../schema/user';
import util from './utilities';
import { Request, Response } from 'express';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

//! last_active should be done on sign out
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await get();

  if (!users.length) throw new CustomError(404, 'No users exist');

  res.status(200).send(users);
};

export const getAllUsersByCompanyId = async (req: Request, res: Response): Promise<void> => {
  const { company_id } = req.params;

  const users = await getByCompanyId(company_id);

  if (!users.length) throw new CustomError(404, 'No users exist');

  res.status(200).send(users);
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await getByEmail(email);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, permissionId, companyId, password } = req.body;

  const signUp: BaseUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    permissionId: permissionId,
    password: password,
    companyId: companyId
  };

  await util.checkBody(signUp);

  const userExists = await getByEmail(signUp.email);

  if (userExists) throw new CustomError(400, 'User is already registered');

  if (signUp.permissionId > 3 || signUp.permissionId < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (signUp.permissionId === 1) {
    // Ensures only 1 owner per company
    const owner = await getAccountOwner(signUp.companyId, 1);
    if (owner) throw new CustomError(400, 'Company already has owner');
  }

  await create(signUp);

  res.status(201).send({ message: 'User was sucessfully created' });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { password, email, permissionId, active } = req.body;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  const updateUser: Partial<User> = {
    password: password,
    email: email,
    permissionId: permissionId,
    active: active
  };

  await util.checkBody(updateUser);

  if (user.email !== updateUser.email) {
    const emailExists = await getByEmail(updateUser.email);
    if (emailExists) throw new CustomError(400, 'Email already exists');
  }

  if (updateUser.permissionId > 3 || updateUser.permissionId < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (updateUser.permissionId !== user.permissionId && updateUser.permissionId <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await update(id, updateUser);

  res.status(201).send({ message: 'User successfully updated' });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  await removeById(id);

  res.status(200).send({ message: 'User successfully deleted' });
};
