import { checkBody } from './utilities';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getByEmail } from '../model/user';
// import { updateRefreshToken, getRefreshToken } from '../model/auth';
import { UserLogin, UserPayload } from '../types/auth';
import CustomError from '../errorHandler/CustomError';
import client from '../database/tedis';

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

  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    permission_id: user.permission_id
  };

  const accessToken = await jwt.sign(payload, process.env.ACCESS_JWT_KEY, { expiresIn: '60s' });
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_JWT_KEY, { expiresIn: '3d' });

  if (!accessToken || !refreshToken) throw new CustomError(401, 'Invalid token');

  // place into header on client side
  //! samesite requires cors header to be set
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.json({ accessToken, refreshToken });
};

export const postRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) throw new CustomError(401, 'User is not authenticated');

  // check if token exists among blacklisted tokens
  const isBlackListedToken = await client.get(refreshToken);

  if (isBlackListedToken) throw new CustomError(401, 'blacklisted');

  await jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, async (err, user) => {
    if (err) throw new CustomError(403, 'Invalid token');

    // destructures email from user to override expiresIn from user
    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_JWT_KEY, {
      expiresIn: '20s'
    });

    res.json({ accessToken: accessToken });
  });
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  // clear the access token in client end by setting the in-memory variable for accessToken = null
  const { refreshToken } = req.cookies;

  await jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, async (err, user) => {
    if (err) throw new CustomError(403, 'Invalid token');

    const userId = user.id;

    // blacklists the refreshToken
    await client.set(refreshToken, userId);

    // TTL for refreshToken is set to 3 days
    await client.expire(refreshToken, 259200);
  });

  res.clearCookie('refreshToken');
  res.redirect('/login');
};
