import _ from 'lodash';
import { Router } from 'express';

var router = Router();

export function initRoutes(db) {

  router.get('/definitions', (req, res) => {
    res.status(200).json({ definitions: db.get('definitions').value() });
  });

  _.forEach(db.get('definitions').value(),(table, key) => {
    router.get(`/definitions/${key}`, (req, res) => {
      res.status(200).json({ [`${key}`]: db.get(`definitions.${key}`).value() });
    });
  });

  router.get('*', (req, res) => {
    res.status(404).json({ message: 'The requested resource was not found.' });
  });
}

export default router;
