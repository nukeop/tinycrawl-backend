import basicAuth from 'basic-auth';
import bcrypt from 'bcrypt';
import { User } from '../models';

export default function authenticationMiddleware(req, res, next) {
  let auth = req.header('Authorization');
  if (!auth) {
    next();
    return;
  }

  let credentials = basicAuth(req);
  let user = db.get(User.table).find({username: credentials.name}).value();

  if(credentials && user && bcrypt.compareSync(credentials.pass, user.password)) {
    req.authorizedUser = user.uuid;
    next();
    return;
  }

  next();
}
