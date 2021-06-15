import CustomError from '../errorhandler/CustomError';

type A = { [key: string]: unknown };

const checkBody = function (requestBody: A): void {
  for (const [key, value] of Object.entries(requestBody)) {
    if (value === undefined || value === null || value === '') {
      throw new CustomError(400, key + ' is required');
    }
  }
};

// const verify = function () {};

const currentTimeStamp = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export default {
  checkBody,
  currentTimeStamp
};
