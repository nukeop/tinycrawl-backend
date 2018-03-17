import _ from 'lodash';

import { BadRequest } from './errors';

export function checkRequiredParams(req, res, required) {
  let params = req.body;

  _.forEach(required, r => {
    if (!_.includes(Object.keys(params), r)) {
      BadRequest(res, `Missing required parameter: ${r}`);
      return false;
    }
  });

  return true;
}
