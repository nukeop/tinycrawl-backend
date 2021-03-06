import mongoose from 'mongoose';
import nonascii from 'non-ascii';
import jwt from 'jsonwebtoken';

import config from '../config';
import { enumUserRoles } from '../models/user';
import {
  requireBasicAuth,
  requireToken,
  requireSameUserAuthenticated,
  requiredParams,
  requiredRole,
  conditionParam,
  validateSchema
} from '../middleware/routeDecorators';
import { putUserSchema } from '../schemas/users';
import { NotFound, BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';
import {
  createInventoryItem,
  inventoryItems
} from '../game/items/itemCreators';
import { serializeAll } from '../helpers';

const Area = mongoose.model('Area');
const Currency = mongoose.model('Currency');
const Hero = mongoose.model('Hero');
const User = mongoose.model('User');
const Inventory = mongoose.model('UserInventory');

const sendValueAtKeyIfNotNull = (obj, key, res) => {
  if (!obj) {
    NotFound(res, 'Not found');
  } else {
    res.status(200).json({ [`${key}`]: obj[key] });
  }
};

function createEndpoint(router) {
  router.get('/users/authenticate', [
    requireBasicAuth
  ], (req, res) => {
    const token = jwt.sign(
      { username: req.authorizedUser.username },
      config.jwtSecret      
    );
    
    res.status(200).json({
      message: 'Success',
      token
    });
  });

  createCRUDforResource(router, [], 'users', User);

  router.get('/users/username/:username', (req, res) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if (!user) {
          res.status(404).send();
        } else {
          res.status(200).json({ users: user.serialize() });
        }
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/:uuid', (req, res) => {
    User.findById(req.params.uuid)
      .then(user => {
        if (!user) {
          res.status(404).send();
        } else {
          res.status(200).json({ users: user.serialize() });
        }
      })
      .catch(handleMongooseErrors(res));
  });

  router.delete('/users/:uuid', [
    requireToken,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    User.findById(req.params.uuid)
      .then(user => {
        return user.remove();
      })
      .then(() => {
        res.status(204).send();
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/username/:username/areas', (req, res) => {
    User.findOne({ username: req.params.username })
      .then(user => {
        return Area.find({ user: user._id });
      })
      .then(areas => {
        res.status(200).json({ areas: serializeAll(areas) });
      })
      .catch(handleMongooseErrors(res));
  });
  
  router.get('/users/username/:username/heroes', (req, res) => {
    User.findOne({username: req.params.username})
      .then(user => {
        return Hero.find({ user: user._id});
      })
      .then(heroes => {
        res.status(200).json({ heroes });
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/:uuid/heroes', (req, res) => {
    Hero.find({ user: req.params.uuid })
      .then(heroes => {
        res.status(200).json({ heroes });
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/username/:username/inventory', (req, res) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if(!_.isNil(user)) {
          return Inventory.findOne({ user: user._id });
        } else {
          NotFound(res, 'User not found');
        }
      })
      .then(inventory => {
        res.status(200).json({ inventory: inventory.serialize() });
      })
      .catch(handleMongooseErrors(res));
  });

  router.post('/users', [
    conditionParam(
      'username',
      username => !_.isEmpty(username),
      'username must not be empty'
    ),
    conditionParam(
      'username',
      username => !nonascii.test(username),
      'username contains invalid characters'
    ),
    requiredParams([
      'username',
      'password',
      'email',
      'displayName'])
  ],
  async (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.role = enumUserRoles.USER_ROLE;
    user.heroes = [];
    user.inventory = new Inventory();

    try{
      await user.setPassword(req.body.password);
    } catch(err) {
      BadRequest(res, err.message);
      return;
    }
    
    user.save()
      .then(async () => {
        user.inventory.user = user._id;
        user.inventory.currencies = {};
        const currencies = await Currency.find();
        user.inventory.initializeCurrencies(currencies);
        await user.inventory.save();
        
        const initialSMPod = createInventoryItem(
          inventoryItems.STRANGE_MATTER_POD,
          { potency: 1 }
        );
        
        initialSMPod.inventory = user.inventory;
        await initialSMPod.save();

        await Inventory.findByIdAndUpdate(
          user.inventory._id,
          {
            '$push': { 'items': initialSMPod._id }
          }
        );
        
        res.status(201).json(user.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  router.put('/users/:uuid', [
    requireToken,
    requireSameUserAuthenticated,
    validateSchema(putUserSchema)
  ], (req, res) => {
    User.findById(req.params.uuid)
      .then(user => {
        user.displayName = _.defaultTo(
          req.body.displayName,
          user.displayName
        );

        user.email = _.defaultTo(
          req.body.email,
          user.email
        );
        return user.save();
      })
      .then(user => {
        res.status(200).json(user.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  router.put('/users/:uuid/displayName', [
    requireToken,
    requireSameUserAuthenticated,
    requiredParams(['displayName'])
  ], (req, res) => {
    User.findById(req.params.uuid)
      .then(user => {
        user.displayName = req.body.displayName;
        return user.save();
      })
      .then(user => {
        res.status(200).json(user.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  router.put('/users/:uuid/role', [
    requireToken,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE]),
    requiredParams(['role'])
  ], (req, res) => {
    User.findById(req.params.uuid)
      .then(user => {
        user.role = req.body.role;
        return user.save();
      })
      .then(user => {
        res.status(200).json(user.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  console.log('Endpoints for users created');
}

export default createEndpoint;
