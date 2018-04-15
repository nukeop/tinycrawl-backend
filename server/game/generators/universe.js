import _ from 'lodash';

import { Marker } from '../../models';
import { enumMarkerTypes } from '../../models/marker';
import NameGenerator from './names';

import starNames from '../data/dictionaries/starNames.yaml';

const starNameGenerator = new NameGenerator(starNames.segments, starNames.rules);
const orbits = {
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

export {
  populateUniverse,
  generateStars
};
