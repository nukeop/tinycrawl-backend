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
}
