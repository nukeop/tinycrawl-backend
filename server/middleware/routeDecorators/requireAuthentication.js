import { Unauthenticated } from '../../errors';

export default function requireAuthentication(req, res, next) {
  if (!req.authorizedUser) {
    Unauthenticated(res);
    return;
  }

  next();
}
