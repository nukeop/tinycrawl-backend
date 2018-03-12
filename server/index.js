import express from 'express';

import datastore from './datastore';
import { initDatabase, loadInitialTables } from './datastore';
var server = express();


function start() {
  datastore
  .then(db => {
    initDatabase(db);
    loadInitialTables(db);
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err);
  });
}

start();
