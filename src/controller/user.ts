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
  // permission will be gotten a different way
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

  // company should be a dropdown menu?
  // If not, you have to check for its existence. But if you do dropdown, user needs to be approved

  // a permisson id is needed and then we need a get for that permission id to check permission level

  if (newUser.permission_id === 1) {
    // then does user email match the company? we use getCompanyByEmail and if he returns, then move forth

    const company = await Company.getById(newUser.company_id);

    if (company?.email !== newUser.email) throw new CustomError(403, 'Request denied');
  }

  await User.create(newUser);

  res.status(201).send({ message: 'User was sucessfully created' });
};
