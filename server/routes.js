import { Router } from 'express';
import _ from 'lodash';

import createAllEndpoints from './endpoints';
import { NotFound } from './errors';

var router = Router();

export function initRoutes() {
  createAllEndpoints(router);

  router.get('/', (req, res) => {
    res.status(200).json({resources: _.map(router.stack, el => {
      return {
        path: el.route.path,
        method: el.route.stack[0].method
      };
    })});
  });

  router.options('*', (req, res) => {
    res.status(200).send();
  });

  router.all('*', (req, res) => {
    NotFound(res, 'The requested resource was not found.');
  });
}

export default router;
