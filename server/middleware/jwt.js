import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import config from '../config';

var User = mongoose.model('User');


export default async function jwtMiddleware(req, res, next) {
  if (!req.token) {
    next();
  }

  const decoded = jwt.verify(req.token, config.jwtSecret);
  if(decoded.username) {
    const user = await User.findOne({ username: decoded.username });
    req.authorizedByToken = user;
    next();
    return;
  } else {
    next();
  }
}
