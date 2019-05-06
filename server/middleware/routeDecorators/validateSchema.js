import { BadRequest } from '../../errors';

export default function validateSchema(schema){
  return async (req, res, next) => {
    const params = req.body;

    try {
      await schema.validate(params);
      next();
    } catch(error) {
      BadRequest(res, error.errors);
      return;
    }
  };
}
