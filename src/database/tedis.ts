/* eslint-disable */
import { Tedis } from 'tedis';

// on(event: 'connect' | 'timeout', listener: () => void): void;
// on(event: "error", listener: (err: Error) => void): void;
// on(event: "close", listener: (had_error: boolean) => void): void;

//! use production url or port and host when pushing up to production
// https://github.com/silkjs/tedis#readme
// defailt values: port: 6379, host: '127.0.0.1'

const client = new Tedis({
  port: 6379,
  host: '127.0.0.1'
});

client.on('connect', () => {
  console.log('Client connected to redis...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (err) => {
  console.log(err.message);
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

export default client;
