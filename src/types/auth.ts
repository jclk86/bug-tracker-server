import { User } from './user';

export type UserLogin = {
  email: string;
  password: string;
};

export interface UserPayload {
  id?: string;
  account_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
  iat?: number;
}

export interface UserToken extends User {
  access_token: string;
  refresh_token: string;
  blacklisted: boolean;
}

export type Token = string;
