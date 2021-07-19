import CustomError from '../errorHandler/CustomError';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';
import bcrypt from 'bcrypt';

export const checkBody = function (requestBody: unknown): void {
  for (const [key, value] of Object.entries(requestBody)) {
    if (value === undefined || value === null || value === '') {
      throw new CustomError(400, key + ' is required');
    }
  }
};

export const currentTimeStamp = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

export const hashPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword;
};

export const validateUUID = function (uuidBody: { [key: string]: string }): void {
  for (const [key, value] of Object.entries(uuidBody)) {
    if (!isValidUUIDV4(value as string)) throw new CustomError(400, `Invalid ${key}`);
  }
};
