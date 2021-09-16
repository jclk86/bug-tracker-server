import { checkBody } from './utilities';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { retrieveBy } from '../model/user';
import { UserLogin, UserPayload } from '../types/auth';
import CustomError from '../errorHandler/CustomError';
import client from '../database/tedis';

// https://indepth.dev/posts/1382/localstorage-vs-cookies
// https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userLogin: UserLogin = {
    email: email,
    password: password
  };

  await checkBody(userLogin);

  const user = await retrieveBy(null, userLogin.email);

  if (!user) throw new CustomError(400, 'User does not exist');

  const isMatch = await bcrypt.compare(userLogin.password, user.password);

  if (!isMatch) throw new CustomError(400, 'Incorrect email or password');

  const payload = {
    id: user.id
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

  res.json({ token: accessToken });
};

// https://stackoverflow.com/questions/66614039/refresh-token-how-to-handle-post-routing

export const postRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies || '';

  if (!refreshToken) throw new CustomError(401, 'Unauthorized');

  // check if token exists among blacklisted tokens
  const isBlackListedToken = await client.get(refreshToken);

  if (isBlackListedToken) throw new CustomError(401, 'blacklisted');

  await jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, async (err, user: UserPayload) => {
    if (err) throw new CustomError(401, 'Invalid token');

    const { id } = user;

    const newAccessToken = await jwt.sign({ id }, process.env.ACCESS_JWT_KEY, {
      expiresIn: '1h'
    });

    res.status(201).json({ token: newAccessToken });
  });
};
// ! add last active - requires type
export const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies || '';

  if (!refreshToken) throw new CustomError(401, 'Unauthorized');

  await jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, async (err, user) => {
    if (err) return res.status(401);

    const userId = user.id;

    // blacklists the refreshToken
    await client.set(refreshToken, userId);

    // TTL for refreshToken is set to 3 days
    await client.expire(refreshToken, 259200);
  });

  res.clearCookie('refreshToken');

  res.end();
};
