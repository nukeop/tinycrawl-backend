import _ from 'lodash';
import mongoose from 'mongoose';

import { enumUserRoles } from '../models/user';
import { BadRequest } from '../errors';
import { requireAuthentication, requiredParams, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';

var StarSystem = mongoose.model('StarSystem');
var Universe = mongoose.model('Universe');

function createEndpoint(router) {
  router.get('/starSystems', (req, res) => {
    StarSystem
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
    StarSystem
    .findById(req.params.uuid)
    .populate('universe')
    .populate('celestialObjects')
    .populate('centers')
    .then(starSystems => {
      res.status(200).json({ starSystems: _.map(starSystems, system => system.serialize())});
    })
    .catch(handleMongooseErrors(res));
  });

  router.delete('/starSystems/:uuid', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    StarSystem
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

    let starSystem = new StarSystem({
      universe: req.body.universeId,
      name: req.body.name,
      positionX: req.body.positionX,
      positionY: req.body.positionY
    });
    starSystem.save()
    .then(() => {
      return Universe.findById(req.body.universeUuid);
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
