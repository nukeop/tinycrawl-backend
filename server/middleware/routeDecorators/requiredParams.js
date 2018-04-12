import _ from 'lodash';
import { BadRequest } from '../../errors';

export default function requiredParams(required) {
  return (req, res, next) => {
    _.forEach(required, r => {
      if (!_.includes(Object.keys(req.body), r)) {
        BadRequest(res, `Missing required parameter: ${r}`);
        return;
      }
    });

    next();
  };
}
