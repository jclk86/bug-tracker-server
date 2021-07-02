export interface BaseAdmin {
  email: string;
  password: string;
  permission_id: number;
  active: boolean;
}
export interface UpdateAdmin extends BaseAdmin {
  last_edited: string;
}

export interface Admin extends BaseAdmin {
  id: string;
  company_id: string;
  first_name: string;
  last_name: string;
}
