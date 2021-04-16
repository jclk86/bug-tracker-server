import { v4 as uuid } from 'uuid';

const amountOfAccountOwners = 1;

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('account_owner').del();

  // Inserts seed entries
  for (let i = 0; i < amountOfAccountOwners; i++) {
    await knex('account_owner').insert([
      {
        id: uuid(),
        name: `Company${i}`,
        email: `email${i}@gmail.com`,
        password: `password${i}`,
        permission: 'admin',
        company_id: `c14713cd-65b0-42be-bb93-69380693f66f`,
        active: true
      }
    ]);
  }
};
