import { User } from '../models';
import uniqueParam from '../middleware/routeDecorators/uniqueParam';
import requiredParams from '../middleware/routeDecorators/requiredParams';
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

  router.post('/users', [
    requiredParams(['username', 'email', 'password']),
    uniqueParam('username', User.table),
    uniqueParam('email', User.table)
  ], (req, res) => {
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
