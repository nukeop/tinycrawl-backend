import _ from 'lodash';
import casual from 'casual';

import { Marker } from '../../models';
import { enumMarkerTypes } from '../../models/marker';
import NameGenerator from './names';

import starNames from '../data/dictionaries/starNames.yaml';
import planetNames from '../data/dictionaries/planetNames.yaml';

const starNameGenerator = new NameGenerator(starNames.segments, starNames.rules);
const planetNameGenerator = new NameGenerator(planetNames.segments, planetNames.rules);

const orbitsRules = {
  COMET: [],
  DERELICT: [],
  GAS_GIANT: ['MOON', 'DERELICT', 'STATION'],
  MOON: ['DERELICT', 'STATION'],
  PLANET: ['MOON', 'DERELICT', 'STATION'],
  STAR: ['COMET', 'DERELICT', 'GAS_GIANT', 'PLANET',
  'STAR', 'STATION'],
  STATION: []
};

function populateUniverse() {
  // Generates an initial universe that can be expanded as needed later on
  // Generate stars - up to 5 at first
}

function generateStars(universeUuid, n) {
  let stars = [];
  for (var i=0; i<n;i++) {
    let star = new Marker({
      universeUuid,
      name: starNameGenerator.generate(),
      type: enumMarkerTypes.STAR
    });
    stars.push(star);
  }

  return stars;
}

function generateSolarSystem(star) {
  let solarSystem = [star];

  // Add planets - up to 9
  for (var i=0; i<casual.integer(0, 9); i++) {
    let planet = new Marker({
      universeUuid: star.universeUuid,
      name: planetNameGenerator.generate(),
      type: enumMarkerTypes.PLANET
    });

    planet.parentMarker = star.uuid;
    star.satellites.push(planet.uuid);

    solarSystem.push(planet);
  }

  // Generate gas giants, up to 4, if there aren't enough planets
  if (_.filter(solarSystem, obj => obj.type === enumMarkerTypes.PLANET).length < 9) {
    for (var i=0; i<casual.integer(0, 4); i++) {
      let giant = new Marker({
        universeUuid: star.universeUuid,
        name: planetNameGenerator.generate(),
        type: enumMarkerTypes.GAS_GIANT
      });

      giant.parentMarker = star.uuid;
      star.satellites.push(giant.uuid);

      solarSystem.push(giant);
    }
  }

  console.log(solarSystem);
}

export {
  populateUniverse,
  generateStars,
  generateSolarSystem
};
