import _ from 'lodash';

import { BadRequest } from './errors';

export function checkEnum(res, paramName, value, allowedValues) {
  if (!_.includes(allowedValues, value)) {
    BadRequest(res, `Parameter ${paramName}'s value is not allowed. Allowed values: ${allowedValues}'`);
    return false;
  }

  return true;
}
