var express = require('express');
var server = express();


function start() {
  server.listen(process.env.PORT);
}

module.exports = {
  start
}
