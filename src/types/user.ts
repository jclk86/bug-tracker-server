export interface BaseUser {
  email: string;
  password: string;
  permission_id: number;
  active: boolean;
}
export interface UpdateUser extends BaseUser {
  last_edited: string;
}

export interface User extends BaseUser {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
  date_created: string;
}

export interface UserRefreshToken extends User {
  refresh_token: string;
  blacklisted: boolean;
}
