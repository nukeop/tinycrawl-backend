import _ from 'lodash';
import { User } from '../../models';
import { enumUserRoles } from '../../models/user';

export default function requiredRole(roles) {
  return (req, res, next) => {
    if (!_.includes(roles, req.authorizedUser.role)) {
      res.status(403).send();
    } else {
      next();
    }
  };
}
