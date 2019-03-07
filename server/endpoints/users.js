import mongoose from 'mongoose';
import _ from 'lodash';

import { enumUserRoles } from '../models/user';
import {
  requireAuthentication,
  requireSameUserAuthenticated,
  requiredParams,
  requiredRole
} from '../middleware/routeDecorators';
import { NotFound, BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var User = mongoose.model('User');

const sendValueAtKeyIfNotNull = (obj, key, res) => {
  if (!obj) {
    NotFound(res, 'Not found');
  } else {
    res.status(200).json({ [`${key}`]: obj[key] });
  }
};

function createEndpoint(router) {
  router.get('/users/authenticate', [
    requireAuthentication
  ], (req, res) => {
    res.status(200).json({
      message: 'Success'
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
    requireAuthentication,
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
      .populate('heroes')
      .then(user => {
        sendValueAtKeyIfNotNull(user, 'heroes', res);
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/:uuid/heroes', (req, res) => {
    User.findById(req.params.uuid)
      .populate('heroes')
      .then(user => {
        sendValueAtKeyIfNotNull(user, 'heroes', res);
      })
      .catch(handleMongooseErrors(res));
  });

  router.post('/users', (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.displayName = req.body.username;
    user.email = req.body.email;
    user.role = enumUserRoles.USER_ROLE;
    user.setPassword(req.body.password);

    user.save()
      .then(() => {
        res.status(201).json(user.serialize());
      })
      .catch(handleMongooseErrors(res));
  });

  router.put('/users/:uuid/displayName', [
    requireAuthentication,
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
    requireAuthentication,
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
