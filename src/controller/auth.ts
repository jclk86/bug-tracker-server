import { checkBody } from './utilities';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getByEmail } from '../model/user';
import { updateRefreshToken, getRefreshToken } from '../model/auth';
import { UserLogin, UserPayload } from '../types/auth';
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

  const payload = {
    id: user.id,
    email: user.email,
    permission_id: user.permission_id
  };

  const accessToken = await generateAccessToken(payload, process.env.ACCESS_JWT_KEY);
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_JWT_KEY);

  // add refresh token to database

  if (!accessToken || !refreshToken) throw new CustomError(401, 'Invalid token');

  await updateRefreshToken(user.id, refreshToken);

  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

export const signRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new CustomError(401, 'Invalid token');

  const { refresh_token, blacklisted } = await getRefreshToken(refreshToken);

  if (blacklisted) throw new CustomError(403, 'Denied');

  if (!refresh_token) throw new CustomError(403, 'Invalid token');

  jwt.verify(refresh_token, process.env.REFRESH_JWT_KEY, (err, user) => {
    if (err) throw new CustomError(403, 'Invalid token');

    const accessToken = generateAccessToken({ email: user.email }, process.env.ACCESS_JWT_KEY);

    res.json({ accessToken: accessToken });
  });
};
// ! create an intermediary table?
export const signOut = async (req: Request, res: Response): Promise<void> => {
  res.status(204);
};

const generateAccessToken = (user: UserPayload, token: string) => {
  return jwt.sign(user, token, { expiresIn: '60s' });
};
