const ticketPriorities = [
  {
    order_number: 0,
    option: 'None',
    marks_empty: true
  },
  {
    order_number: 1,
    option: 'Low',
    marks_empty: false
  },
  {
    order_number: 2,
    option: 'Medium',
    marks_empty: false
  },
  {
    order_number: 3,
    option: 'High',
    marks_empty: true
  }
];

exports.seed = async function (knex) {
  await knex('ticket_priority').del();
  await knex('ticket_priority').insert(ticketPriorities);
};
