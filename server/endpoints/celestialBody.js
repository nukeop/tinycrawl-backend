import _ from 'lodash';
import mongoose from 'mongoose';

import { enumUserRoles } from '../models/user';
import { enumCelestialBodyClassifications } from
'../models/CelestialBody';
import { BadRequest } from '../errors';
import { requireAuthentication, requiredParams, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';

var CelestialBody = mongoose.model('CelestialBody');
var StarSystem = mongoose.model('StarSystem');

function createEndpoint(router) {

  router.get('/celestialBodies', (req, res) => {
    CelestialBody
      .find({})
      .populate('starSystem')
      .populate('satellites')
      .populate('areas')
      .then(celestialBodies => {
	res.status(200).json({ celestialBodies: _.map(celestialBodies, body => body.serialize())});
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/celestialBodies/:uuid', (req, res) => {
    CelestialBody
      .findById(req.params.uuid)
      .populate('starSystem')
      .populate('satellites')
      .populate('areas')
      .then(celestialBodies => {
	res.status(200).json({ celestialBodies: _.map(celestialBodies, body => body.serialize())});
      })
      .catch(handleMongooseErrors(res));
  });

  router.delete('/celestialBodies/:uuid', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    CelestialBody
      .findById(req.params.uuid)
      .then(celestialBody => {
	return celestialBody.remove();
      })
      .then(celestialBody => {
	res.status(204).send();
      })
      .catch(handleMongooseErrors(res));
  });

  router.post('/celestialBodies', requiredParams(['starSystemId', 'name', 'classification']),
  (req, res) => {
    let celestialBody = new CelestialBody({
      starSystem: req.body.starSystemId,
      name: req.body.name,
      classification: req.body.classification
    });
    celestialBody.save()
      .then(() => {
	return StarSystem.findById(req.body.starSystemId);
      })
      .then(starSystem => {
	starSystem.celestialObjects =
	  _.union(starSystem.celestialObjects, [celestialBody._id]);
	return starSystem.save();
      })
      .then(() => {
	res.status(201).json(celestialBody.serialize());
      })
      .catch(handleMongooseErrors(res));
  });
}

export default createEndpoint;
