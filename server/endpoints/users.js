import _ from 'lodash';
import mongoose from 'mongoose';

import { User } from '../models';
import { enumUserRoles } from '../models/user';
import {
  enumParam,
  uniqueParam,
  requireAuthentication,
  requiredParams,
  requiredRole
} from '../middleware/routeDecorators';
import * as dummy from '../models/mongoose/user';
import { handleMongooseErrors } from '../utils';

var mongoose_User = mongoose.model('User');

function createEndpoint(router) {
  router.get('/users', (req, res) => {
    mongoose_User.find({}).then(users => {
      res.status(200).json({users: _.map(users, user => user.serialize())});
    });
  });

  router.get('/users/:uuid', (req, res) => {
    mongoose_User.findById(req.params.uuid)
    .then(user => {
      if (!user) {
        res.status(404).send();
      } else {
        res.status(200).json({ users: user.serialize() });
      }
    })
    .catch(handleMongooseErrors(res));
  });

  router.delete('/users/:uuid',[
    requireAuthentication,
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE])
  ], (req, res) => {
    mongoose_User.findById(req.params.uuid)
    .then(user => {
      return user.remove();
    })
    .then(user => {
      res.status(204).send();
    })
    .catch(handleMongooseErrors(res));
  });

  router.get('/users/:uuid/heroes', (req, res) => {
    res.status(200).json({ heroes: db.get('heroes').filter({userUuid: req.params.uuid}).value() });
  });

  router.get('/users/:uuid/universes', (req, res) => {
    res.status(200).json({ universes: db.get('universes').filter({userUuid: req.params.uuid}).value() });
  });

  router.post('/users', (req, res) => {
    let user = new mongoose_User();
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
    mongoose_User.findById(req.params.uuid)
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
