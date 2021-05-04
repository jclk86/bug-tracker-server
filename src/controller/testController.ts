import test from '../model/test';
import { RequestHandler } from 'express';
// models are classes, so you would instantiate those classes here.
// can use typecasting on request body, since TS doesn't know what type it will be
// !typecasting only instances that you know what the type will be.
// typecasting uses 'as' keyword, followed by the type {title: string}
// we know our own api and database types, so do typecasting
// see 5:00 of working with controllers and parsing req bodies in TS tutorial

// !if dealing with params ... params.id = /:id in routes.
// for req.params.whatver, the RequestHandler mustb e given a generic type or else
// req.params.whatever will resort to "any" type again. Ex: RequestHandler<{ whatever: string}>
const get: RequestHandler = async (req, res) => {
  const data = await test.get();

  res.send(data);
};

export default {
  get
};
