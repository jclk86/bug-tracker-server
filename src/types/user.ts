export interface BaseUser {
  email: string;
  password: string;
  role: string;
  active: boolean;
}
export interface UpdateUser extends BaseUser {
  last_edited: string;
}

export interface User extends BaseUser {
  id: string;
  account_id: string;
  first_name: string;
  last_name: string;
  date_created: string;
}
