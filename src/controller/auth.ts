import { checkBody } from './utilities';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getByEmail } from '../model/user';
import { UserLogin } from '../schema/auth';
import CustomError from '../errorhandler/CustomError';

export const signin = async (req: Request, res: Response): Promise<void> => {
  const userLogin: UserLogin = {
    email: req.body.email,
    password: req.body.password
  };

  await checkBody(userLogin);
  // change exists
  const user = await getByEmail(userLogin.email);

  if (!user) throw new CustomError(400, 'User does not exist');

  await bcrypt.compare(user.password, user.password).then((isMatch) => {
    if (!isMatch) {
      throw new CustomError(400, 'Incorrect email or password');
    }
    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_KEY);

    res.json({ token: token });
  });
};
