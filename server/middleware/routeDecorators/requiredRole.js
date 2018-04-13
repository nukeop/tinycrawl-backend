import _ from 'lodash';
import { User } from '../../models';
import { enumUserRoles } from '../../models/user';

export default function requiredRole(roles) {
  return (req, res, next) => {
    let user = db.get(User.table).find({ uuid: req.authorizedUser }).value();
    if (!_.includes(roles, user.role)) {
      res.status(403).send();
    } else {
      next();
    }
  };
}
