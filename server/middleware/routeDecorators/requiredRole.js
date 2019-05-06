import _ from 'lodash';

export default function requiredRole(roles) {
  return (req, res, next) => {
    if (!_.includes(roles, req.authorizedByToken.role)) {
      res.status(403).send();
    } else {
      next();
    }
  };
}
