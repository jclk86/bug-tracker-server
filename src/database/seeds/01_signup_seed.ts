// const { v4: uuidv4 } = require('uuid');

// const amountOfusers = 4;
// const checklistId = '3b1862d8-74fd-476f-beda-b89171eb4bb9';

// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex('signup').del();

//   // Inserts seed entries
//   for (let i = 0; i < amountOfusers; i++) {
//     await knex('signup').insert([
//       {
//         id: uuidv4(),
//         first_name: `User${i}`,
//         last_name: `Test${i}`,
//         email: `test${i}@email.com`,
//         subscribed: true,
//         checklist_id: checklistId
//       }
//     ]);
//   }
// };
