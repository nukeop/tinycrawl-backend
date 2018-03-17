import express from 'express';
import bodyParser from 'body-parser';

import datastore from './datastore';
import router, { initRoutes } from './routes';
import { initDatabase, loadInitialTables } from './datastore';
var server = express();


function start() {
  datastore
  .then(db => {

    // Initialize database and update definitions
    initDatabase(db);
    loadInitialTables(db);
    initRoutes(db);

    // Put database in global scope so we don't have to pass it everywhere
    global.db = db;

    // Start the server
    server.use('/', router);
    server.use(bodyParser.urlEncoded({ extended: true }));
    server.use(bodyParser.json());
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err);
  });
}

start();
