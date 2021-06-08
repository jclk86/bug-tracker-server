const permission_levels = [
  {
    order_number: 0,
    level: 'Admin'
  },
  {
    order_number: 1,
    level: 'Owner'
  },
  {
    order_number: 2,
    level: 'Manager'
  },
  {
    order_number: 3,
    level: 'Developer'
  }
];

exports.seed = async function (knex) {
  await knex('permission').del();
  await knex('permission').insert(permission_levels);
};
