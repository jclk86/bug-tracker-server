import { checkBody } from './utilities';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getByEmail } from '../model/user';
import { UserLogin } from '../types/auth';
import CustomError from '../errorHandler/CustomError';

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userLogin: UserLogin = {
    email: email,
    password: password
  };

  await checkBody(userLogin);

  const user = await getByEmail(userLogin.email);

  if (!user) throw new CustomError(400, 'User does not exist');

  const isMatch = await bcrypt.compare(userLogin.password, user.password);

  if (!isMatch) throw new CustomError(400, 'Incorrect email or password');

  // exp uses seconds. Date.now() uses milliseconds. Must divide value by 1000 to get seconds.
  const limit = 60 * 3; // 180 seconds
  const expiresInSeconds = Math.floor(Date.now() / 1000) + limit;

  const payload = {
    id: user.id,
    email: user.email,
    exp: expiresInSeconds
  };

  const token = await jwt.sign(payload, process.env.JWT_KEY);

  if (!token) throw new CustomError(400, 'Invalid user info');

  res.json({ token: token });
};
