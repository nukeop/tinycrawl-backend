import express from 'express';

import datastore from './datastore';
import router, { initRoutes } from './routes';
import { initDatabase, loadInitialTables } from './datastore';
var server = express();


function start() {
  datastore
  .then(db => {
    initDatabase(db);
    loadInitialTables(db);
    initRoutes(db);
    server.use('/', router);
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err);
  });
}

start();
