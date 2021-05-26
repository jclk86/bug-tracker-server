import { ICompany } from '../schema/company';
import CustomError from '../errorhandler/CustomError';

const checkBody = function (requestBody: ICompany): void {
  for (const [key, value] of Object.entries(requestBody)) {
    if (value === undefined || value === null || value === '') {
      throw new CustomError(400, key + ' is required');
    }
  }
};

// const verify = function () {};

export default {
  checkBody
};
