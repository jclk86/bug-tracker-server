export interface BaseAccount {
  company_name: string;
  email: string;
}
export interface UpdateAccount extends BaseAccount {
  last_edited: string;
}
export interface Account extends BaseAccount {
  id: string;
  date_created: string;
}
