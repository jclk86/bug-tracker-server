export default {
  all
};

// db queries
function all(trx, limit = 100) {
  return trx.select('*').from('company').limit(limit);
}
