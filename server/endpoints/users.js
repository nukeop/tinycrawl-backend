import { User } from '../models';
import {
  checkRequiredParams,
  checkParamUniqueness
} from '../utils';
import _ from 'lodash';

function createEndpoint(router) {
  router.get('/users', (req, res) => {
    let users = db.get('users').value();
    users = _.map(users, user => {
      return User.deserialize(user).serialize();
    });

    res.status(200).json({ users: users });
  });

  router.get('/users/:uuid', (req, res) => {
    res.status(200).json({ users: db.get('users').filter({uuid: req.params.uuid}).value() });
  });

  router.delete('/users/:uuid', (req, res) => {
    db.get('users').remove({ uuid: req.params.uuid }).write();
    res.status(204).json();
  });

  router.get('/users/:uuid/heroes', (req, res) => {
    res.status(200).json({ heroes: db.get('heroes').filter({userUuid: req.params.uuid}).value() });
  });

  router.get('/users/:uuid/universes', (req, res) => {
    res.status(200).json({ universes: db.get('universes').filter({userUuid: req.params.uuid}).value() });
  });

  router.post('/users', (req, res) => {
    if(!checkRequiredParams(req, res, ['username', 'email', 'password'])) {
      return;
    }

    if (!checkParamUniqueness(res, 'username', req.body.username, User.table)) {
      return;
    }

    if (!checkParamUniqueness(res, 'email', req.body.email, User.table)) {
      return;
    }

    let user = new User();
    user.create(req.body)
    .then(hash => {
      user.password = hash;
      user.save();
      res
      .status(201)
      .json(user.serialize());
    });
  });

  console.log('Endpoints for users created');
}

export default createEndpoint;
