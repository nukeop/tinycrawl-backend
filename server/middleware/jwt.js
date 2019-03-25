import jwt from 'jsonwebtoken';

import config from '../config';

export default function jwtMiddleware(req, res, next) {
  if (!req.token) {
    next();
  }

  const decoded = jwt.verify(req.token, config.jwtSecret);
  console.log(decoded);
  next();
}
