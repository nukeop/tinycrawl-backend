import { Unauthenticated } from '../../errors';

export default function requireBasicAuthentication(req, res, next) {
  if (!req.authorizedUser) {
    Unauthenticated(res);
    return;
  }

  next();
}
