import { ICompany } from '../schema/company';

type ResultSuccess = { success: string };
type ResultError = { error: string };

const checkBody = function (requestBody: ICompany): ResultError | ResultSuccess {
  for (const [key, value] of Object.entries(requestBody)) {
    if (value === undefined || value === null || value === '') {
      return {
        error: key + ' is required'
      };
    }
  }
  return {
    success: 'successful'
  };
};

// const verify = function () {};

export default {
  checkBody
};
