import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import { initMongo, loadInitialTables } from './datastore';
import router, { initRoutes } from './routes';
import middleware from './middleware';
var server = express();


function start() {
  // MongoDB
  initMongo();
  loadInitialTables();

  // Router
  initRoutes();
  
  // Start the server
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(middleware.authentication);
  server.use(middleware.cors);
  server.use('/', router);
  server.listen(process.env.PORT);
  console.log(`Server started listening on port ${process.env.PORT}`);
}

start();
