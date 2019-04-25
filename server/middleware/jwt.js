import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import _ from 'lodash';

import config from '../config';
import { BadRequest } from '../errors';

var User = mongoose.model('User');


export default async function jwtMiddleware(req, res, next) {
  if (!_.isString(req.token)) {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(req.token, config.jwtSecret);
    if(decoded.username) {
      const user = await User.findOne({ username: decoded.username });
      req.authorizedByToken = user;
      next();
      return;
    } else {
      next();
    }
  } catch(err) {
    BadRequest(res, err);
    return;
  }
}
