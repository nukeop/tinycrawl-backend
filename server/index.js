import express from 'express';

import datastore from './datastore';
var server = express();


function start() {
  server.listen(process.env.PORT);
}

start();
