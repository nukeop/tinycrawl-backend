import bcrypt from 'bcrypt';
import { User } from '../models';

export default function authenticationMiddleware(req, res, next) {
  let auth = req.header('Authorization');
  if (!auth) {
    next();
    return;
  }

  let tokens = auth.split(' ');
  try {
    let method = tokens[0];
    let authData = tokens[1];

    if (method !== 'Basic') {
      throw new Error('Authentication method is not Basic');
    }

    authData = Buffer.from(authData, 'base64').toString().split(':');
    let username = authData[0];
    let password = authData[1];

    let user = db.get(User.table).find({username: username}).value();

    if(bcrypt.compareSync(password, user.password)) {
      req.authorizedUser = user.uuid;
      next();
      return;
    }
  } catch (err) {
    next();
    return;
  }

  next();
}
