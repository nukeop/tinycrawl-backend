var path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const SERVER_DIR = path.resolve(__dirname, 'server');
const DATA_DIR = path.resolve(__dirname, 'game', 'data');

module.exports = {
  entry: path.resolve(SERVER_DIR, 'index.js'),
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        include: SERVER_DIR,
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.yaml$/,
        loader: 'json-loader!yaml-loader',
        include: DATA_DIR
      }
    ]
  }
}
