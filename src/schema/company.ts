export interface ICompany {
  id: string;
  name: string;
}

export interface IUpdateCompany {
  name: string;
}

export interface ICompanyGeneric {
  [key: string]: string;
}
