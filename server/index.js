import express from 'express';
var server = express();


function start() {
  server.listen(process.env.PORT);
}

start();
