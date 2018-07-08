import _ from 'lodash';
import mongoose from 'mongoose';

import { enumUserRoles } from '../models/user';
import { enumCelestialBodyClassifications } from
  '../models/CelestialBody';
import { BadRequest } from '../errors';
import { requireAuthentication, requiredParams, requiredRole } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var CelestialBody = mongoose.model('CelestialBody');
var StarSystem = mongoose.model('StarSystem');

function createEndpoint(router) {
  createCRUDforResource(router, 'celestialBodies', CelestialBody);

  // Returns one selected body
  router.get('/celestialBodies/:uuid', (req, res) => {
    CelestialBody
      .findById(req.params.uuid)
      .populate('starSystem')
      .populate('satellites')
      .populate('areas')
      .then(celestialBody => {
        res.status(200).json({ celestialBodies: [celestialBody.serialize()]});
      })
      .catch(handleMongooseErrors(res));
  });

  // Deletes one body
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

  // Creates a new celestial body
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

  // Updates satellites of this body
  router.put('/celestialBodies/:uuid/satellites', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE]),
    requiredParams(['satellites'])
  ], (req, res) => {
    CelestialBody.findById(req.params.uuid)
      .then(celestialBody => {
        celestialBody.satellites = req.body.satellites;
        return celestialBody.save();
      })
      .then(celestialBody => {
        res.status(200).json(celestialBody.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  router.put('/celestialBodies/:uuid/areas', [
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE]),
    requiredParams(['areas'])
  ], (req, res) => {
    CelestialBody.findById(req.params.uuid)
      .then(celestialBody => {
        celestialBody.areas = req.body.areas;
        return celestialBody.save();
      })
      .then(celestialBody => {
        res.status(200).json(celestialBody.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  console.log('Endpoints for celestial bodies created');
}

export default createEndpoint;
