import { Unauthorized } from '../../errors';

export default function requireSameUserAuthenticated(req, res, next) {
  if (req.params.uuid !== req.authorizedUser._id.toString()) {
    Unauthorized(res);
    return;
  }

  next();
}
