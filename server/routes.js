import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { Router } from 'express';

import { User } from './models';

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
    let uuid = uuidv4();
    let user = new User({uuid});
    user.save(db);
    res
    .status(200)
    .json(user.serialize());
  });

  router.get('*', (req, res) => {
    res.status(404).json({ message: 'The requested resource was not found.' });
  });
}

export default router;
