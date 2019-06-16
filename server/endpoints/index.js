import createActionsEndpoint from './actions';
import createAreasEndpoint from './areas';
import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';
import createItemsEndpoint from './items';
import createNotesEndpoint from './notes';
import createServiceEndpoint from './service';

function createAllEndpoints(router) {
  createDefinitionsEndpoint(router);
  createActionsEndpoint(router);
  createAreasEndpoint(router);
  createUsersEndpoint(router);
  createHeroesEndpoint(router);
  createItemsEndpoint(router);
  createNotesEndpoint(router);
  createServiceEndpoint(router);
}

export default createAllEndpoints;
