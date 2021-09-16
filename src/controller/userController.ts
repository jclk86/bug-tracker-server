import { retrieveAll, retrieveBy, create, update, remove } from '../model/user';
import { retrieveBy as retrieveAccount } from '../model/account';
import { retrieveBy as retrieveInvite, remove as removeInvite } from '../model/invite';
import { checkBody, currentTimeStamp, hashPassword, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { User, UpdateUser } from '../types/user';
import { ROLE } from '../middleware/permission/role';
import jwt from 'jsonwebtoken';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const account = await retrieveAccount(accountId, null, null);

  if (!account) throw new CustomError(404, 'Account does not exist');

  const users = await retrieveAll(accountId, null);

  if (!users.length) throw new CustomError(404, 'Users have not been added');

  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId });

  const user = await retrieveBy(userId, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { userEmail } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await retrieveBy(null, userEmail);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};
// ! Must be invited, unless owner. If owner, email must match account email.
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, role, password } = req.body;

  console.log({
    firstName,
    lastName,
    role,
    email,
    password
  });

  // Checks if user was invited to register under account
  const invited = await retrieveInvite(null, email);
  console.log('invited: ', invited);

  if (!invited)
    throw new CustomError(
      404,
      'Must be invited by account owner to register as user for this account'
    );

  // Checks if user already exists in db.
  // Note: If an employee of a current company wants to sign up as account owner, must use different email
  const user = await retrieveBy(null, email);

  console.log('USER: ', user);

  if (user)
    throw new CustomError(
      409,
      'User is already registered. Please register with a different email.'
    );

  const account = await retrieveAccount(invited.account_id, null);

  if (account) throw new CustomError(409, 'Account no longer exists.');

  // Assign owner if email matches
  const isOwner = account.email === email ? 'owner' : role;

  // Hash password
  const hashedPassword = await hashPassword(password);

  const signUp: User = {
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    role: isOwner,
    password: hashedPassword,
    account_id: invited.account_id,
    active: true,
    date_created: currentTimeStamp
  };

  await checkBody(signUp);

  // creates user
  await create(signUp);

  // removes newly created user from invite table
  await removeInvite(email);

  // signs in after user sign up
  const payload = {
    id: signUp.id
  };

  const accessToken = await jwt.sign(payload, process.env.ACCESS_JWT_KEY, {
    expiresIn: '1h'
  });

  // ! add expiry date to refresh token
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_JWT_KEY);

  if (!accessToken || !refreshToken) throw new CustomError(401, 'Invalid token');

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.status(201).json({ token: accessToken });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, role, active } = req.body;

  await validateUUID({ userId });

  if (password === '') throw new CustomError(400, 'Missing password');

  const user = await retrieveBy(userId, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  const hashedPassword = await hashPassword(password);

  // ! as a form on client side, these items will hold old values and be edited back in. So you require them here.
  const updatedUser: UpdateUser = {
    password: hashedPassword,
    email: email,
    role: role,
    active: active,
    last_edited: currentTimeStamp
  };

  await checkBody(updatedUser);
  // Checks if email exists already under account id
  if (user.email !== updatedUser.email) {
    const emailExists = await retrieveBy(null, updatedUser.email);

    if (emailExists) throw new CustomError(409, 'Email already exists');

    const invited = await retrieveInvite(null, email);

    if (invited) throw new CustomError(409, 'Email already exists');
  }

  if (
    (updatedUser.role !== user.role && updatedUser.role === ROLE.OWNER) ||
    updatedUser.role === ROLE.ADMIN
  )
    throw new CustomError(400, 'Can only change roles between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send(updatedUser);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId });

  const user = await retrieveBy(userId, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  await remove(userId);

  res.status(200).send({ message: 'User was successfully deleted' });
};
