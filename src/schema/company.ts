export interface BaseCompany {
  name: string;
}

export interface Company extends BaseCompany {
  id: string;
  dateCreated: string;
  lastEdited?: string;
}
