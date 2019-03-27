import { Unauthenticated } from '../../errors';

export default function requireToken(req, res, next) {
  if (!req.authorizedByToken) {
    Unauthenticated(res);
    return;
  }
  next();
}
