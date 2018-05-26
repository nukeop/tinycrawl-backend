import createDefinitionsEndpoint from './definitions';
import createUsersEndpoint from './users';
import createHeroesEndpoint from './heroes';
import createUniversesEndpoint from './universes';
import createStarSystemsEndpoint from './starSystem';
import createCelestialBodiesEndpoint from './celestialBody';

function createAllEndpoints(router) {
  createDefinitionsEndpoint(router);
  createUsersEndpoint(router);
  createHeroesEndpoint(router);
  createUniversesEndpoint(router);
  createStarSystemsEndpoint(router);
  createCelestialBodiesEndpoint(router);
}

export default createAllEndpoints;
