import {
  getByEmail,
  getById,
  getByCompanyId,
  getAccountOwner,
  create,
  update,
  removeById
} from '../model/user';
import { getById as getCompany } from '../model/company';
import { checkBody, currentTimeStamp, hashPassword, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { User, UpdateUser } from '../types/user';

//! last_active should be done on sign out

export const getAllUsersByCompanyId = async (req: Request, res: Response): Promise<void> => {
  const { companyId } = req.params;

  await validateUUID({ companyId: companyId });

  const companyExists = await getCompany(companyId);

  if (!companyExists) throw new CustomError(404, 'Company does not exist');

  const users = await getByCompanyId(companyId);

  if (!users.length) throw new CustomError(404, 'Users have not been added');

  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId: userId });
  //! change to userExists
  const user = await getById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { userEmail } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await getByEmail(userEmail);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, permissionId, companyId, password } = req.body;

  // hash password
  //! check what happens if no password is passed
  // ! company should be auto assigned
  const hashedPassword = await hashPassword(password);

  const signUp: User = {
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

  if (userExists) throw new CustomError(409, 'User is already registered');

  if (signUp.permission_id > 3 || signUp.permission_id < 0)
    throw new CustomError(404, 'Permission level does not exist');

  if (signUp.permission_id === 1) {
    // Ensures only 1 owner per company
    const owner = await getAccountOwner(signUp.company_id, 1);
    if (owner) throw new CustomError(409, 'Company already has owner');
  }

  await create(signUp);

  res.status(201).send(signUp);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, permissionId, active } = req.body;

  await validateUUID({ userId: userId });

  const user = await getById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  const hashedPassword = await hashPassword(password);

  // ! as a form on client side, these items will hold old values and be edited back in. So you require them here.
  const updatedUser: UpdateUser = {
    password: hashedPassword,
    email: email,
    permission_id: permissionId,
    active: active,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedUser);

  if (user.email !== updatedUser.email) {
    const emailExists = await getByEmail(updatedUser.email);
    if (emailExists) throw new CustomError(409, 'Email already exists');
  }

  if (updatedUser.permission_id > 3 || updatedUser.permission_id < 0)
    throw new CustomError(400, 'Permission level does not exist');

  if (updatedUser.permission_id !== user.permission_id && updatedUser.permission_id <= 1)
    throw new CustomError(400, 'Can only change permission level between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send(updatedUser);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId: userId });

  const user = await getById(userId);

  if (!user) throw new CustomError(404, 'User does not exist');

  await removeById(userId);

  res.status(200).send({ message: 'User was successfully deleted' });
};
