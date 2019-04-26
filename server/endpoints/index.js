import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';
import createNotesEndpoint from './notes';
import createServiceEndpoint from './service';

function createAllEndpoints(router) {
  createDefinitionsEndpoint(router);
  createUsersEndpoint(router);
  createHeroesEndpoint(router);
  createNotesEndpoint(router);
  createServiceEndpoint(router);
}

export default createAllEndpoints;
