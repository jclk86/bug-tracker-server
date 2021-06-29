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
import util from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';
import bcrypt from 'bcrypt';

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
  const { userEmail } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await getByEmail(userEmail);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  const isValid = await isValidUUIDV4(userId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(userId);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, permissionId, companyId, password } = req.body;

  // hash password
  //! check what happens if no password is passed
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const signUp = {
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    permission_id: permissionId,
    password: hashedPassword,
    company_id: companyId,
    active: true,
    date_created: util.currentTimeStamp
  };

  await util.checkBody(signUp);

  const userExists = await getByEmail(signUp.email);

  if (userExists) throw new CustomError(400, 'User is already registered');

  if (signUp.permission_id > 3 || signUp.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (signUp.permission_id === 1) {
    // Ensures only 1 owner per company
    const owner = await getAccountOwner(signUp.company_id, 1);
    if (owner) throw new CustomError(400, 'Company already has owner');
  }

  await create(signUp);

  res.status(201).send({ message: 'User was sucessfully created' });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, permissionId, active } = req.body;

  const isValid = await isValidUUIDV4(userId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(userId);

  if (!user) throw new CustomError(400, 'User does not exist');

  const updatedUser = {
    password: password,
    email: email,
    permission_id: permissionId,
    active: active,
    last_edited: util.currentTimeStamp
  };

  await util.checkBody(updatedUser);

  if (user.email !== updatedUser.email) {
    const emailExists = await getByEmail(updatedUser.email);
    if (emailExists) throw new CustomError(400, 'Email already exists');
  }

  if (updatedUser.permission_id > 3 || updatedUser.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (updatedUser.permission_id !== user.permission_id && updatedUser.permission_id <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send({ message: 'User successfully updated' });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  const isValid = await isValidUUIDV4(userId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(userId);

  if (!user) throw new CustomError(400, 'User does not exist');

  await removeById(userId);

  res.status(200).send({ message: 'User successfully deleted' });
};
