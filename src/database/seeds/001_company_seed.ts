import { v4 as uuid } from 'uuid';

const amountOfCompanies = 4;

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('company').del();

  // Inserts seed entries
  for (let i = 0; i < amountOfCompanies; i++) {
    await knex('company').insert([
      {
        id: uuid(),
        name: `Company${i}`
      }
    ]);
  }
};
