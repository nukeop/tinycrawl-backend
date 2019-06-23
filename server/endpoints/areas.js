import mongoose from 'mongoose';

import {
  requiredRole,
  requireToken,
  validateSchema
} from '../middleware/routeDecorators';
import { enumUserRoles } from '../models/user';
import { postAreaSchema } from '../schemas/areas';
import { NotFound, BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';
import { modCurrencyAmount } from '../game/currencies';
import AreaFactory from '../game/factories/areas';

const Area = mongoose.model('Area');
const Environment = mongoose.model('Environment');
const User = mongoose.model('User');

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
      .catch(handleMongooseErrors(res));
  });

  router.post('/areas',
    requireToken,
    requiredRole([
      enumUserRoles.ROOT_ROLE,
      enumUserRoles.ADMIN_ROLE
    ]),
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
        environment: environment._id,
        sectors: []
      });

      area.save()
        .then(() => {
          res.status(201).json(area.serialize());
        })
        .catch(handleMongooseErrors(res));
    });

  router.post('/areas/discover',
    requireToken,
    async (req, res) => {
      const userId = req.authorizedByToken._id;
      
      try {
        modCurrencyAmount(req.authorizedByToken, 'SM', -1);
      } catch(error) {
        res.status(400).json({ message: error.message });
      }

      const area = await new AreaFactory(userId).generate();
      await area.save();
      
      res.status(200).json(area.serialize());
    });

  console.log('Endpoints for areas created');
}

export default createEndpoint;
