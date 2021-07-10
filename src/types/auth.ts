import { User } from './user';

export type UserLogin = {
  email: string;
  password: string;
};

export interface UserPayload {
  id?: string;
  email?: string;
  permission_id?: number;
}

export interface UserToken extends User {
  refresh_token: string;
  blacklisted: boolean;
}

export type Token = string;
