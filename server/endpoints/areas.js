import mongoose from 'mongoose';

import { NotFound, BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';

const Area = mongoose.model('Area');
const Environment = mongoose.model('Environment');
const User = mongoose.model('User');

import {
  requireToken,
  validateSchema
} from '../middleware/routeDecorators';

import { postAreaSchema } from '../schemas/areas';

function createEndpoint(router) {
  router.get('/areas/:uuid', async(req, res) => {
    Area.findById(req.params.uuid)
      .then(area => {
        if(!area) {
          NotFound(res);
        } else {
          res.status(200).json(area.serialize());
        }
      })
      .catch(handleMongooseErrors);
  });

  router.post('/areas',
    requireToken,
    validateSchema(postAreaSchema),
    async (req, res) => {
      const user = await User.findById(req.body.user);
      if(!user) {
        BadRequest(res, 'No user with this id');
        return;
      }

      const environment = await Environment.findOne({
        name: req.body.environment
      });
      if(!environment) {
        BadRequest(res, 'No such environment');
        return;
      }
                
      const area = new Area({
        user: req.body.user,
        name: req.body.name,
        seed: req.body.seed,
        environment: req.body.environment,
        sectors: []
      });

      area.save()
        .then(() => {
          res.status(201).json(area.serialize());
        })
        .catch(handleMongooseErrors);
    });

  console.log('Endpoints for areas created');
}

export default createEndpoint;
