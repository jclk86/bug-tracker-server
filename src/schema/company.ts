export interface ICompany {
  id: string;
  name: string;
  date_created: string;
}

export interface IUpdateCompany {
  name: string;
  last_edited: string;
}

export interface ICompanyGeneric {
  [key: string]: string;
}
