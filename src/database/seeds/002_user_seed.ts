import { v4 as uuid } from 'uuid';

const amount = 1;
// knex seed:run --specific=002_user_seed.ts
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  for (let i = 0; i < amount; i++) {
    await knex('user').insert([
      {
        id: uuid(),
        name: 'John Chan',
        email: 'johnchan@gmail.com',
        password: 'Password123!',
        active: true,
        permission: 'owner',
        company_id: '9bf71040-8622-4a33-8187-ab49dcf480fb'
      }
    ]);
  }
};
