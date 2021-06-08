const ticketStatuses = [
  {
    order_number: 0,
    option: 'Open',
    color: 'blue',
    marks_empty: false,
    marks_completion: false
  },
  {
    order_number: 1,
    option: 'In Progress',
    color: 'purple',
    marks_empty: false,
    marks_completion: false
  },
  {
    order_number: 2,
    option: 'Testing',
    color: 'orange',
    marks_empty: false,
    marks_completion: false
  },
  {
    order_number: 3,
    option: 'Closed',
    color: 'green',
    marks_empty: false,
    marks_completion: true
  }
];

exports.seed = async function (knex) {
  await knex('ticket_status').del();
  await knex('ticket_status').insert(ticketStatuses);
};
