import {
  get,
  getByEmail,
  getByName,
  getById,
  getAccountOwner,
  create,
  update,
  removeById
} from '../model/user';
import { User } from '../schema/user';
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

//! last_active should be done on sign out
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await get();
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

  const isValid = isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await getByName(name);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;

  // check password
  const newUser: User = {
    id: uuidv4(),
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    permission_id: user.permission_id,
    date_created: util.currentTimeStamp,
    password: user.password,
    company_id: user.company_id,
    active: true
  };

  await util.checkBody(newUser);

  const userExists = await getByEmail(newUser.email);

  if (userExists) throw new CustomError(400, 'User is already registered');

  if (newUser.permission_id > 3 || newUser.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (newUser.permission_id === 1) {
    // Ensures only 1 owner per company
    const owner = await getAccountOwner(newUser.company_id, 1);
    if (owner) throw new CustomError(400, 'Company already has owner');
  }

  await create(newUser);

  res.status(201).send({ message: 'User was sucessfully created' });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  // search for id
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  const userBody: Partial<User> = {
    password: req.body.password,
    email: req.body.email,
    permission_id: req.body.permission_id,
    active: req.body.active,
    last_edited: util.currentTimeStamp
  };

  await util.checkBody(userBody);

  //! if (userBody.permission_id > 3 || userBody.permission_id < 0)
  //!   throw new CustomError(400, 'Non-existent permission level');

  if (userBody.permission_id !== user.permission_id && userBody.permission_id <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await update(id, userBody);

  res.status(201).send({ message: 'User successfully updated' });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  await removeById(id);

  //! what if owner is deleted? we don't want to delete everyone if owner is deleted

  res.status(200).send({ message: 'User successfully deleted' });
};
