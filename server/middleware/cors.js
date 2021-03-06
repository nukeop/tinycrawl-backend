import _ from 'lodash';

export default function corsWildcard(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    _.defaultTo(req.headers['access-control-request-headers'], ''),
  );

  next();
}
