import { BadRequest } from '../../errors';

export default function conditionParam(paramName, condition, messageIfFail) {
  return (req, res, next) => {
    if(condition(req.body[paramName])) {
      next();
    } else {
      BadRequest(res, messageIfFail);
      return;
    }
  };
}
