import * as express from 'express';
const app = express();

app.get('/test', (req, res) => {
  res.send('Hello World');
});

console.log('hi');

app.get('/', (req, res) => {
  res.status(404).send({ error: { message: 'Page Not Found' } });
});

export default app;
