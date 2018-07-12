import mongoose from 'mongoose';

import { enumUserRoles } from '../models/user';
import { requireAuthentication, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var Universe = mongoose.model('Universe');

function createEndpoint(router) {
  createCRUDforResource(router, [], 'universes', Universe);

  router.get('/universes/:uuid', (req, res) => {
    Universe.findById(req.params.uuid)
      .then(() => {
        res.status(200).send();
      })
      .catch(handleMongooseErrors(res));
  });

  router.delete('/universes/:uuid', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    Universe.findById(req.params.uuid)
      .then(universe => {
        return universe.remove();
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(handleMongooseErrors(res));
  });

  router.post('/universes', (req, res) => {
    let universe = new Universe({
      user: req.authorizedUser._id
    });
    universe.save()
      .then(() => {
        res.status(201).json(universe.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  console.log('Endpoints for universes created');
}

export default createEndpoint;
