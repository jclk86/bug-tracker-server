const projectStatuses = [
  {
    id: 0,
    option: 'None',
    color: 'gray',
    marks_empty: false,
    marks_completion: false
  },
  {
    id: 1,
    option: 'On Hold',
    color: 'red',
    marks_empty: false,
    marks_completion: false
  },
  {
    id: 2,
    option: 'Planning',
    color: 'blue',
    marks_empty: false,
    marks_completion: false
  },
  {
    id: 3,
    option: 'Developing',
    color: 'purple',
    marks_empty: false,
    marks_completion: false
  },
  {
    id: 4,
    option: 'Testing',
    color: 'orange',
    marks_empty: false,
    marks_completion: false
  },
  {
    id: 5,
    option: 'Completed',
    color: 'green',
    marks_empty: false,
    marks_completion: true
  }
];

exports.seed = async function (knex) {
  await knex('project_status').del();
  await knex('project_status').insert(projectStatuses);
};
