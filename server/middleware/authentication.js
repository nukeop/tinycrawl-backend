import basicAuth from 'basic-auth';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

var User = mongoose.model('User');

export default function authenticationMiddleware(req, res, next) {
  let auth = req.header('Authorization');
  if (!auth) {
    next();
    return;
  }

  let credentials = basicAuth(req);
  if (!credentials) {
    next();
  } else {
    User.findOne({ username: credentials.name })
      .then(user => {
        if(credentials && user && bcrypt.compareSync(credentials.pass, user.password)) {
          req.authorizedUser = user;
          next();
          return;
        } else {
          next();
        }
      });
  } 
}
