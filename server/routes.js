import _ from 'lodash';
import { Router } from 'express';

import {
  User,
  Hero
} from './models';
import { NotFound } from './errors';

var router = Router();

export function initRoutes(db) {

  router.get('/definitions', (req, res) => {
    res.status(200).json({ definitions: db.get('definitions').value() });
  });

  _.forEach(db.get('definitions').value(),(table, key) => {
    router.get(`/definitions/${key}`, (req, res) => {
      res
      .status(200)
      .json({
        [`${key}`]: db.get(`definitions.${key}`).value()
      });
    });

    router.get(`/definitions/${key}/:name`, (req, res) => {
      res
      .status(200)
      .json({
        [`${key}`]: db.get(`definitions.${key}`).filter({name: req.params.name}).value()
      });
    });
  });

  router.get('/users', (req, res) => {
    res.status(200).json({ users: db.get('users').value() });
  });

  router.get('/users/:uuid', (req, res) => {
    res.status(200).json({ users: db.get('users').filter({uuid: req.params.uuid}).value() });
  });

  router.post('/users', (req, res) => {
    let user = new User({});
    user.save();
    res
    .status(200)
    .json(user.serialize());
  });

  router.get('/heroes', (req, res) => {
    res.status(200).json({ heroes:db.get('heroes').value()});
  });

  router.post('/heroes/:heroDefinition/:name/:userUuid', (req, res) => {
    let definition = db.get('definitions.heroes').filter({name: req.params.heroDefinition}).head().value();

    if (definition === undefined) {
      NotFound(res, `Hero class ${req.params.heroDefinition} does not exist`);
      return;
    }

    let user = db.get('users').filter({uuid: req.params.userUuid}).head().value();

    if (user === undefined) {
      NotFound(res, 'User with this uuid does not exist');
      return;
    }

    let hero = new Hero({
      userUuid: req.params.userUuid,
      name: req.params.name,
      heroDefinition: definition
    });
    hero.save();

    res.status(200).json(hero.serialize());
  });

  router.get('/', (req, res) => {
    res.status(200).json({resources: Object.keys(db.value())});
  });

  router.get('*', (req, res) => {
    res.status(404).json({ message: 'The requested resource was not found.' });
  });
}

export default router;
