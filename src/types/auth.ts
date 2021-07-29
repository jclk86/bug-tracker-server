import { User } from './user';

export type UserLogin = {
  email: string;
  password: string;
};

export interface UserPayload {
  id?: string;
  email?: string;
  role?: string;
}

export interface UserToken extends User {
  access_token: string;
  refresh_token: string;
  blacklisted: boolean;
}

export type Token = string;
