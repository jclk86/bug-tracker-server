import express from 'express';
import supertest from 'supertest';
const app = express();

import application from '../app';

application.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use('/', application);

it('/test route works', (done) => {
  supertest(app).get('/test').expect('Hello World').expect(200, done);
});
