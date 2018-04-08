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

export function checkEnum(res, paramName, value, allowedValues) {
  if (!_.includes(allowedValues, value)) {
    BadRequest(res, `Parameter ${paramName}'s value is not allowed. Allowed values: ${allowedValues}'`);
    return false;
  }

  return true;
}

export function checkParamUniqueness(res, paramName, value, table) {
  if (db.get(table).find({[`${paramName}`]: value}).value()) {
    BadRequest(res, `Parameter ${paramName} should be unique but there is another resource that has this value`);
    return false;
  }

  return true;
}
