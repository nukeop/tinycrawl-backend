import { Unauthorized } from '../../errors';

export default function requireSameUserAuthenticated(req, res, next) {
  if (req.params.uuid !== req.authorizedByToken._id.toString()) {
    Unauthorized(res);
    return;
  }

  next();
}
