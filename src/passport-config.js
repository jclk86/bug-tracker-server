// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import bcrypt from 'bcrypt';

// connect to database, specifically with users.
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// export default function initialize(passport) {
//   const authenticateUser = async function (email, password, done) {
//     const user = function (user) {
//       return user;
//     };
//     if (!user) {
//       return done(null, false, { message: 'something' });
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user, { message: 'something' });
//       } else {
//         return done(null, false, { message: 'incorrect password' });
//       }
//     } catch (e) {
//       return done(e); // this is an error with application, unlike above. The above error is a sign in error
//     }
//   };
  //passport.use('jwt', new JwtStrategy({ fieldName: 'fieldName' }, authenticateUser))
  // passport.serializeUser((user, done) => { done(null, user.id })
  // passport.deserializeUser((id, done) => done(null, getUserById(id)))
  // use strategy
  // pass in object with key val pair of what you want to use -- jwt
  // second parameter will be function to be called to authenticate user
  // have passport serializeUser(user,done) to store inside of session
  // serialize determines which data of user to store in session
  // ex: req.session.passport.user = {id: 'xyz', email: w@gmail.com, etc...}
  // then passport deserializeUser(id, done) to
}
