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
  conditionParam
} from '../middleware/routeDecorators';
import { NotFound, BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var Hero = mongoose.model('Hero');
var User = mongoose.model('User');
var Inventory = mongoose.model('UserInventory');

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

  router.get('/users/:uuid', [], (req, res) => {
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
      username => username.length > 0,
      'username must not be empty'
    ),
    conditionParam(
      'username',
      username => !nonascii.test(username),
      'username contains invalid characters'
    )
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
      .then(() => {
        user.inventory.user = user._id;
        return user.inventory.save();
      })
      .then(() => {
        res.status(201).json(user.serialize());
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
