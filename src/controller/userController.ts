import { retrieve, create, update, remove } from '../model/user';
import { retrieve as retrieveAccount } from '../model/account';
import { retrieve as retrieveInvite, remove as removeInvite } from '../model/invite';
import { checkBody, currentTimeStamp, hashPassword, validateUUID } from './utilities';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errorHandler/CustomError';
import { User, UpdateUser } from '../types/user';
import { ROLE } from '../middleware/permission/role';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;

  await validateUUID({ accountId });

  const account = await retrieveAccount(accountId);

  if (!account) throw new CustomError(404, 'Account does not exist');

  const users = await retrieve(accountId, null, null, null);

  if (!users.length) throw new CustomError(404, 'Users have not been added');

  res.status(200).send(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId });

  const user = await retrieve(null, userId, null, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};

export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  const { userEmail } = req.params;
  // const formattedName = encodeURI(name).replace(/%20/g, ' ');
  // add to lowerCase. I think this is Front end duty though
  // console.log(formattedName);
  const user = await retrieve(null, null, userEmail, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  res.status(200).send(user);
};
// ! Must be invited, unless owner. If owner, email must match account email.
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { accountId } = req.params;
  const { firstName, lastName, email, roleTitle, password } = req.body;

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

  // Checks if user was invited to register under account
  const invited = await retrieveInvite(accountId, signUp.email);

  if (!invited)
    throw new CustomError(
      404,
      'Must be invited by account owner to register as user for this account'
    );

  // Checks if user already exists in db.
  // Note: If an employee of a current company wants to sign up as account owner, must use different email
  const user = await retrieve(null, null, signUp.email, null);

  if (user) throw new CustomError(409, 'User is already registered');

  if (signUp.role === ROLE.OWNER) {
    // Ensures only 1 owner per account
    const ownerExists = await retrieve(signUp.account_id, null, null, ROLE.OWNER);
    if (ownerExists) throw new CustomError(409, 'Account already has owner');
  }

  // creates user
  await create(signUp);

  // removes newly created user from invite table
  await removeInvite(email);

  res.status(201).send(signUp);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { password, email, roleTitle, active } = req.body;

  await validateUUID({ userId });

  const user = await retrieve(null, userId, null, null);

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
  // Checks if email exists already under account id
  if (user.email !== updatedUser.email) {
    const emailExists = await retrieve(null, null, updatedUser.email, null);
    if (emailExists) throw new CustomError(409, 'Email already exists');
  }

  if (updatedUser.role !== user.role || updatedUser.role === ROLE.OWNER)
    throw new CustomError(400, 'Can only change roles between Manager and Developer');

  await update(userId, updatedUser);

  res.status(201).send(updatedUser);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  await validateUUID({ userId });

  const user = await retrieve(null, userId, null, null);

  if (!user) throw new CustomError(404, 'User does not exist');

  await remove(userId);

  res.status(200).send({ message: 'User was successfully deleted' });
};
