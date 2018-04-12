import _ from 'lodash';
import { BadRequest } from '../../errors';

export default function requiredParams(required) {
  return (req, res, next) => {

    let go = true;
    _.forEach(required, r => {
      if (!_.includes(Object.keys(req.body), r)) {
        BadRequest(res, `Missing required parameter: ${r}`);
        go = false;
        return;
      }
    });

    if (go) {
      next();
    } else {
      return
    }
  };
}
