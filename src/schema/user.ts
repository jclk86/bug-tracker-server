export interface IUser {
  id: string;
  name: string;
  email: string;
  active: boolean;
  password: string;
  permission_id: number;
  company_id: string;
}

export interface IUpdateUser {
  email: string;
  active: boolean;
  password: string;
  permission_id: number;
}
