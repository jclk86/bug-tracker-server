import Test from '../model/test';
import startTransaction from '../database';
import { RequestHandler } from 'express';

// !typecasting only instances that you know what the type will be.
// typecasting uses 'as' keyword, followed by the type {title: string}
// we know our own api and database types, so do typecasting
// see 5:00 of working with controllers and parsing req bodies in TS tutorial

// !if dealing with params ... params.id = /:id in routes.
// for req.params.whatver, the RequestHandler mustb e given a generic type or else
// req.params.whatever will resort to "any" type again. Ex: RequestHandler<{ whatever: string}>
// const get: RequestHandler = async (req, res) => {
//   const data = await test.get();

//   res.send(data);
// };

// export default {
//   get
// };

// controller handles all client requests. Does not directly manipulate database

const all: RequestHandler = async (req, res): Promise<void> => {
  const trx = await startTransaction();
  try {
    // ensures all or nothing transaction
    const companies = await Test.all(trx);
    // commits if all processes in transaction is successful
    await trx.commit();
    res.status(200).send(companies);
  } catch (error) {
    // abort transaction and rollback if not successful. Ensures database integrity.
    await trx.rollback();
    res.status(500).send(error);
  }
};

export default {
  all
};
