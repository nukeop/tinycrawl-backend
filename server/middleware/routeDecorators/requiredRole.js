import _ from 'lodash';

export default function requiredRole(roles) {
  return (req, res, next) => {
    if (!_.includes(roles, req.authorizedUser.role)) {
      res.status(403).send();
    } else {
      next();
    }
  };
}
