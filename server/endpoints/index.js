import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';
import createUniversesEndpoint from './universes';

function createAllEndpoints(router) {
  createDefinitionsEndpoint(router);
  createUsersEndpoint(router);
  createHeroesEndpoint(router);
  createUniversesEndpoint(router);
}

export default createAllEndpoints;
