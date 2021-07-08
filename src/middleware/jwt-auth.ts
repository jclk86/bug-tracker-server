import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../errorHandler/CustomError';
import { UserPayload } from '../types/auth';

// https://stackoverflow.com/questions/54578203/creating-a-middleware-function-to-check-if-user-role-is-equal-to-admin

// define admin or other users in middleware req.ROLE = 'admin'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.get('authorization');

  const [type, token] = authHeader && authHeader.split(' ');

  if (type !== 'Bearer' || typeof token === 'undefined')
    throw new CustomError(401, 'Invalid or expired token');

  const payload = (await jwt.verify(token, process.env.JWT_KEY)) as UserPayload;

  if (!payload) throw new CustomError(403, 'Invalid token');

  /*
    http://expressjs.com/en/api.html#res
    res.locals
    An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle (if any). 
    Otherwise, this property is identical to app.locals.

    This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
  */
  res.locals.jwt = payload;

  // req['user'] = payload; //! delete d.ts and UserPayload if you decide not to use this

  next();
};

//get token, verify correct user, and return user for routes this mw is placed on
