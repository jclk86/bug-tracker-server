import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from './loggers/config/morgan';
import routes from './routes';
import CustomError from './errorhandler/CustomError';
import passport from 'passport';
// initalizePassport (passport, email => users.find(user => user.email === email), id=> user.find( user => user.id === id))

// need app.use to show server how to use passport
// app.use(flash) from express-flash
// app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUnitialized: false }))
// resave - should we resave session variables if nothing is changed
// saveUnitialized -- do you want ot save empty value in session if no value
// app.use(passport.initialize())
// app.use(passport.session()) stores variables in session that works with express-session

// find the login route and replace the req,res with passport.authenticate('jwt', successRedirect: '/', failure: '/login', failureFlash: true )
//failureFlash will show message from passport config done(null, email, { message: 'message' })
// Server class executes constructor when instantiated. Exported into index.ts

// can easily get user now in sessions in any route

// !checkAuthenticated function is needed as middleware, because an error stack will show if no user. This is not something you want to expose to users
// ! if the req.isAuthenticated, return next(). IF not, res.redirect to login page. Make in utilities of ROUTES and add as middleware to each route

// Also, redirect logged in users who try to go back to login

// !checkNotAUthenticated --- if req.isAuthenticated,redirect to ('/'). If so, next(). pass it on to next middleware
// ! this middleware would only be put on login, registration routes to deal with logged in users trying to return to them

// ! app.delete /logout route. -- to use app.delete install method--override --> app.use(methodOverride(_method)) 35 min web dev simpliedfied
// req.logOut() -- passport placed into req object
// res.redirect(/login)

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan);
app.use(passport.initialize());

app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(404, 'Not Found');
  next(err);
});

// if next is used here, will pass to express' in-built error handler -- you don't need to use their in-built errorhandler though
// next needs to be here, or else it returns error stack
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let response;

  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error', status: 500 } };
  } else {
    response = { error };
  }
  // For errors without status codes
  const statusCode = response.error.status || 500;

  // place console.log during development to log error message
  res.status(statusCode).json(response.error.message);
});

export default app;
