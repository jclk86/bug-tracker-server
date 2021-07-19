import { Tedis } from 'tedis';

//! use production url or port and host when pushing up to production
// https://github.com/silkjs/tedis#readme
// defailt values: port: 6379, host: '127.0.0.1'

const client = new Tedis({
  port: 6379,
  host: '127.0.0.1'
});

client.on('connect', () => {
  console.log('connect');
});

client.on('timeout', () => {
  console.log('timeout');
});

client.on('error', (err) => {
  console.log(err);
});

client.on('close', (had_error) => {
  console.log('close with err: ', had_error);
});
// catches ctrl + c events
process.on('SIGINT', () => {
  client.close();
});

export default client;
