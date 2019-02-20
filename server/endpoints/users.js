import mongoose from 'mongoose';
import _ from 'lodash';

import { enumUserRoles } from '../models/user';
import {
  requireAuthentication,
  requiredParams,
  requiredRole
} from '../middleware/routeDecorators';
import { BadRequest } from '../errors';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var User = mongoose.model('User');

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
    console.log(req.params.username);
    User.find({username: req.params.username})
      .then(users => {
        const user = _.head(users);

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

  router.get('/users/:uuid/heroes', (req, res) => {
    User.findById(req.params.uuid)
      .populate('heroes')
      .then(() => {
        res.status(200).send();
      })
      .catch(handleMongooseErrors(res));
  });

  router.get('/users/:uuid/universes', (req, res) => {
    User.findById(req.params.uuid)
      .populate('universes')
      .then(() => {
        res.status(200).send();
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
