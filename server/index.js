import express from 'express';
import bodyParser from 'body-parser';

import datastore from './datastore';
import * as mongoDatastore from './datastore-mongodb';
import router, { initRoutes } from './routes';
import { initDatabase, loadInitialTables } from './datastore';
import middleware from './middleware';
var server = express();


function start() {
  datastore
  .then(db => {

    // Put database in global scope so we don't have to pass it everywhere
    global.db = db;

    // Initialize database and update definitions
    initDatabase();
    initRoutes();

    // MongoDB
    mongoDatastore.initMongo();
    mongoDatastore.loadInitialTables();

    // Start the server
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(middleware.authentication);
    server.use('/', router);
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err);
  });
}

start();
