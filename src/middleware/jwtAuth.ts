import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../errorHandler/CustomError';
import { UserPayload } from '../types/auth';

// https://stackoverflow.com/questions/54578203/creating-a-middleware-function-to-check-if-user-role-is-equal-to-admin

// define admin or other users in middleware req.ROLE = 'admin'
//! https://dev.to/perrydbucs/using-jwts-for-authentication-in-restful-applications-55hc
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.get('x-auth-token');
  console.log('authHeader: ', authHeader);

  const accessToken = authHeader && authHeader.split(' ')[1];

  console.log('accessToken in requireAuth: ', accessToken);

  if (accessToken == null) throw new CustomError(401, 'Unauthorized');

  const { refreshToken } = req.cookies;

  console.log('REFRESH TOKEN IN COOKIE: ', refreshToken);

  // const payload = (await jwt.verify(accessToken, process.env.ACCESS_JWT_KEY)) as UserPayload;

  await jwt.verify(accessToken, process.env.ACCESS_JWT_KEY, (err, user: UserPayload) => {
    if (err) return res.sendStatus(403);
    req['user'] = user;
    next();
  });

  // res.locals.jwt = payload;

  /*
    http://expressjs.com/en/api.html#res
    res.locals
    An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). 
    Otherwise, this property is identical to app.locals.

    This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
  */

  // req['user'] = payload; //! delete d.ts and UserPayload if you decide not to use this

  // next();

  // return null;
};
