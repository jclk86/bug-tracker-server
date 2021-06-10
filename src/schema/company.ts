export interface ICompany {
  id: string;
  name: string;
  email: string;
}

export interface IUpdateCompany {
  name: string;
  email: string;
}

export interface ICompanyGeneric {
  [key: string]: string;
}
