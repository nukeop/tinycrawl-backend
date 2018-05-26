import _ from 'lodash';
import mongoose from 'mongoose';

import { enumCelestialBodyClassifications } from '../models/CelestialBody';
import { handleMongooseErrors } from '../utils';

var CelestialBody = mongoose.model('CelestialBody');

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
}

export default createEndpoint;
