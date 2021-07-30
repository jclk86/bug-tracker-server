const projectPriorities = [
  {
    id: 0,
    option: 'None',
    marks_empty: true
  },
  {
    id: 1,
    option: 'Low',
    marks_empty: false
  },
  {
    id: 2,
    option: 'Medium',
    marks_empty: false
  },
  {
    id: 3,
    option: 'High',
    marks_empty: false
  }
];

exports.seed = async function (knex) {
  await knex('project_priority').del();
  await knex('project_priority').insert(projectPriorities);
};
