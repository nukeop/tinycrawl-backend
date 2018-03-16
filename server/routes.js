import _ from 'lodash';
import { Router } from 'express';

import createAllEndpoints from './endpoints';
import {
  User,
  Hero
} from './models';
import { NotFound } from './errors';

var router = Router();

export function initRoutes(db) {

  createAllEndpoints(router, db);

  router.get('/', (req, res) => {
    res.status(200).json({resources: Object.keys(db.value())});
  });

  router.get('*', (req, res) => {
    res.status(404).json({ message: 'The requested resource was not found.' });
  });
}

export default router;
