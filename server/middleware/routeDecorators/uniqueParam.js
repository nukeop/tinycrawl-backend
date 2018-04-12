import { BadRequest } from '../../errors';

export default function uniqueParam(paramName, table) {
  return (req, res, next) => {
    if (db.get(table).find({[`${paramName}`]: req.body[paramName]}).value()) {
      BadRequest(res, `Parameter ${paramName} should be unique but there is another resource that has this value`);
      return;
    }

    next();
  };
}
