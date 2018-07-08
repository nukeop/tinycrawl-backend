import _ from 'lodash';
import { BadRequest } from '../../errors';

export default function enumParam(paramName, allowedValues) {
  return (req, res, next) => {
    if(!_.includes(allowedValues, req.body[paramName])) {
      BadRequest(res, `Parameter ${paramName}'s value is not allowed. Allowed values: ${allowedValues}'`);
      return;
    }
    next();
  };
}
