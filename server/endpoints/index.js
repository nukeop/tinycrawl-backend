import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';

function createAllEndpoints(router, db) {
  createDefinitionsEndpoint(router, db);
  createUsersEndpoint(router, db);
}

export default createAllEndpoints;
