import User from '../model/user';
import Company from '../model/company';
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

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await User.getByEmail(email);

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

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await User.getByName(name);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const user = req.body;

  // check password
  const newUser = {
    id: uuidv4(),
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    permission_id: user.permission_id,
    password: user.password,
    company_id: user.company_id,
    active: true
  };

  await util.checkBody(newUser);

  const userExists = await User.getByEmail(newUser.email);

  if (userExists) throw new CustomError(400, 'User is already registered');

  if (newUser.permission_id > 3 || newUser.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (newUser.permission_id === 1) {
    // Ensures only 1 owner per company
    const owner = await User.getAccountOwner(newUser.company_id, 1);
    if (owner) throw new CustomError(400, 'Company already has owner');
  }

  await User.create(newUser);

  res.status(201).send({ message: 'User was sucessfully created' });
};

// ! date created keeps updating upon edits. Should remain same, while last_active or last_edited changes
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  // search for id
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await User.getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  const userBody = {
    password: req.body.password,
    email: req.body.email,
    permission_id: req.body.permission_id,
    active: req.body.active
  };

  await util.checkBody(userBody);

  if (userBody.permission_id > 3 || userBody.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (userBody.permission_id !== user.permission_id && userBody.permission_id <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await User.update(id, userBody);

  res.status(201).send({ message: 'User successfully updated' });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isValid = await isValidUUIDV4(id);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await User.getById(id);

  if (!user) throw new CustomError(400, 'User does not exist');

  await User.removeById(id);

  //! what if owner is deleted?

  res.status(200).send({ message: 'User successfully deleted' });
};
