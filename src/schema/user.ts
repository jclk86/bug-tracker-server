export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  password: string;
  permission_id: number;
  company_id: string;
  date_created: string;
  last_edited?: string;
};
