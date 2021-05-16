// model interfaces with database. Handles all data logic and data manipulation

interface Company {
  id: string;
  name: string;
  date: Date;
}

async function all(trx, limit): Promise<Company> {
  return trx.select('*').from('company').limit(limit);
}

export default {
  all
};
