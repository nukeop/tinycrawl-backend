import _ from 'lodash';
import mongoose from 'mongoose';

import { enumUserRoles } from '../models/mongoose/user';
import { BadRequest } from '../errors';
import { StarSystem, Universe } from '../models';
import { requireAuthentication, requiredParams, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';

var mongoose_StarSystem = mongoose.model('StarSystem');
var mongoose_Universe = mongoose.model('Universe');

function createEndpoint(router) {
  router.get('/starSystems', (req, res) => {
    mongoose_StarSystem
    .find({})
    .populate('universe')
    .populate('celestialObjects')
    .populate('centers')
    .then(starSystems => {
      res.status(200).json({ starSystems: _.map(starSystems, system => system.serialize())});
    })
    .catch(handleMongooseErrors(res));
  });

  router.get('/starSystems/:uuid', (req, res) => {
    mongoose_StarSystem
    .findById(req.params.uuid)
    .populate('universe')
    .populate('celestialObjects')
    .populate('centers')
    .then(starSystems => {
      res.status(200).json({ starSystems: _.map(starSystems, system => system.serialize())});
    });
  });

  router.delete('/starSystems/:uuid', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    mongoose_StarSystem
    .findById(req.params.uuid)
    .then(starSystem => {
      return starSystem.remove();
    })
    .then(starSystem => {
      res.status(204).send();
    })
    .catch(handleMongooseErrors(res));
  });

  router.post('/starSystems',
  requiredParams(['universeUuid', 'name', 'positionX', 'positionY']),
  (req, res) => {

    let starSystem = new mongoose_StarSystem({
      universe: req.body.universeId,
      name: req.body.name,
      positionX: req.body.positionX,
      positionY: req.body.positionY
    });
    starSystem.save()
    .then(() => {
      return mongoose_Universe.findById(req.body.universeUuid);
    })
    .then(universe => {
      universe.starSystems = _.union(universe.starSystems, [starSystem._id]);
      return universe.save();
    })
    .then(() => {
      res.status(201).json(starSystem.serialize());
    })
    .catch(handleMongooseErrors(res));
  });
}

export default createEndpoint;
