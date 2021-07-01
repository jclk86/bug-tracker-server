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
import { getById as getCompany } from '../model/company';
import { checkBody, currentTimeStamp, hashPassword } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import CustomError from '../errorhandler/CustomError';

//! last_active should be done on sign out

export const getAllUsersByCompanyId = async (req: Request, res: Response): Promise<void> => {
  const { company_id } = req.params;

  const isValid = isValidUUIDV4(company_id);

  if (!isValid) throw new CustomError(400, 'Invalid company id');

  const companyExists = await getCompany(company_id);

  if (!companyExists) throw new CustomError(400, 'No such company exists');

  const users = await getByCompanyId(company_id);

  if (!users.length) throw new CustomError(404, 'No users exist');

  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  const isValid = await isValidUUIDV4(userId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(userId);

  if (!user) throw new CustomError(400, 'No such user exists');

  res.status(200).send(user);
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

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, permissionId, companyId, password } = req.body;

  // hash password
  //! check what happens if no password is passed
  // ! company should be auto assigned
  const hashedPassword = await hashPassword(password);

  const signUp = {
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    permission_id: permissionId,
    password: hashedPassword,
    company_id: companyId,
    active: true,
    date_created: currentTimeStamp
  };

  await checkBody(signUp);

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

  res.status(201).send(signUp);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, permissionId, active } = req.body;

  const isValid = await isValidUUIDV4(userId);

  if (!isValid) throw new CustomError(400, 'Invalid entry');

  const user = await getById(userId);

  if (!user) throw new CustomError(400, 'User does not exist');

  const hashedPassword = await hashPassword(password);

  // ! as a form on client side, these items will hold old values and be edited back in. So you require them here.
  const updatedUser = {
    password: hashedPassword,
    email: email,
    permission_id: permissionId,
    active: active,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedUser);

  if (user.email !== updatedUser.email) {
    const emailExists = await getByEmail(updatedUser.email);
    if (emailExists) throw new CustomError(400, 'Email already exists');
  }

  if (updatedUser.permission_id > 3 || updatedUser.permission_id < 0)
    throw new CustomError(400, 'Non-existent permission level');

  if (updatedUser.permission_id !== user.permission_id && updatedUser.permission_id <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send(updatedUser);
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
