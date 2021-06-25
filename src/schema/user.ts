export interface BaseUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissionId: number;
  companyId: string;
}
[];

export interface User extends BaseUser {
  id: string;
  active: boolean;
  dateCreated: string;
  lastEdited?: string;
}
