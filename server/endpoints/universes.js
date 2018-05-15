import _ from 'lodash';
import mongoose from 'mongoose';

import { enumUserRoles } from '../models/mongoose/user';
import { BadRequest, NotFound } from '../errors';
import { requireAuthentication, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';

var Universe = mongoose.model('Universe');

function createEndpoint(router) {
  router.get('/universes', (req, res) => {
    Universe
    .find({})
    .populate('user')
    .then(universes => {
      res.status(200).json({ universes: _.map(universes, universe => universe.serialize())});
    })
    .catch(handleMongooseErrors(res));
  });

  router.get('/universes/:uuid', (req, res) => {
    Universe.findById(req.params.uuid)
    .populate('user')
    .then(universe => {
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
    .then(universe => {
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
