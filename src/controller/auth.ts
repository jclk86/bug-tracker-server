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

  // if (user.blacklisted) throw new CustomError(403, 'Denied');

  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    permission_id: user.permission_id
  };

  const accessToken = await jwt.sign(payload, process.env.ACCESS_JWT_KEY, { expiresIn: '60s' });
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_JWT_KEY, { expiresIn: '1y' });

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
// ! https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
// ! then do redis
// !execute on front end when client makes request but access token is expired
export const postRefreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;
  const user = req['user'];

  // or we can check the refresh token first and if not found, then use cookie

  // ! just return nothing - give as little as possible
  if (!refreshToken) throw new CustomError(401, 'User is not authenticated');

  const blacklistedTokens = await client.lrange(user.id, 0, 999999);

  // check if token exists among blacklisted tokens
  if (blacklistedTokens.indexOf(refreshToken) > -1) throw new CustomError(401, 'Unauthorized');

  // https://dev.to/chukwutosin_/how-to-invalidate-a-jwt-using-a-blacklist-28dl
  //  https://dev.to/mr_cea/using-redis-for-token-blacklisting-in-node-js-42g7

  // const { refresh_token, blacklisted } = await getRefreshToken(refreshToken);
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
    // blacklist
    await client.lpush(userId, refreshToken);
  });

  res.clearCookie('refreshToken');
  res.redirect('/login');
};
