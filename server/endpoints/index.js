import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';

function createAllEndpoints(router, db) {
  createDefinitionsEndpoint(router, db);
  createUsersEndpoint(router, db);
  createHeroesEndpoint(router, db);
}

export default createAllEndpoints;
