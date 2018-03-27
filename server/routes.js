import { Router } from 'express';

import createAllEndpoints from './endpoints';
import { NotFound } from './errors';

var router = Router();

export function initRoutes() {

  createAllEndpoints(router);

  router.get('/', (req, res) => {
    res.status(200).json({resources: Object.keys(db.value())});
  });

  router.get('*', (req, res) => {
    NotFound(res, 'The requested resource was not found.');
  });
}

export default router;
