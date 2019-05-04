import { NotFound } from '../errors';
import { handleMongooseErrors } from '../utils';

export function createCRUDforResource(router, middleware, resourceName, model) {
  router.get(`/${resourceName}`, middleware, (req, res) => {
    model
      .find({})
      .then(instances => {
        res.status(200).json({
          [`${resourceName}`]: _.map(instances, instance =>
            instance.serialize())
        });
      })
      .catch(handleMongooseErrors(res));
  });

  router.get(`/${resourceName}/:uuid`, middleware, (req, res) => {
    model.findById(req.params.uuid)
      .then(instance => {
        if (!instance) {
          NotFound(res);
        } else {
          res.status(200).json({
            [`${resourceName}`]: instance.serialize()
          });
        }
      })
      .catch(handleMongooseErrors(res));
  });
}
