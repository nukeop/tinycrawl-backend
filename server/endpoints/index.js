import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';
import createUniversesEndpoint from './universes';
import createMarkersEndpoint from './markers';

function createAllEndpoints(router) {
  createDefinitionsEndpoint(router);
  createUsersEndpoint(router);
  createHeroesEndpoint(router);
  createUniversesEndpoint(router);
  createMarkersEndpoint(router);
}

export default createAllEndpoints;
