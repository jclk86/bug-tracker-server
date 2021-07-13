// import db from '../database/config';
// // import { UserRefreshToken } from '../types/user';
// import { Token } from '../types/auth';

// export function updateRefreshToken(userId: string, refreshToken: Token | null): Promise<void> {
//   const selector = {
//     id: userId
//   };

//   return db<UserRefreshToken>('user').where(selector).update({ refresh_token: refreshToken });
// }

// export function getRefreshToken(refreshToken: Token): Promise<UserRefreshToken | undefined> {
//   const selector = {
//     refresh_token: refreshToken
//   };

//   return db<UserRefreshToken>('user').where(selector).returning('*').first();
// }
