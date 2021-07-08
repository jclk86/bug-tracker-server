export interface BaseCompany {
  name: string;
}
export interface UpdateCompany extends BaseCompany {
  last_edited: string;
}
export interface Company extends BaseCompany {
  id: string;
  date_created: string;
}
