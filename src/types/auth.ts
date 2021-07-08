export type UserLogin = {
  email: string;
  password: string;
};

export interface UserPayload {
  id: string;
  email: string;
  exp: string;
}
