import casual from 'casual';

import { StarSystem } from '../../models';
import NameGenerator from './names';

import starNames from '../data/dictionaries/starNames.yaml';

const starNameGenerator = new NameGenerator(starNames.segments, starNames.rules);

function createInitialUniverse(numSystems, universeUuid) {
  let universe = [];
  let radius = 5;

  for (var i=0; i<numSystems; i++) {
    let name = starNameGenerator.generate();
    let angle = casual.random * Math.PI * 2;
    let x = Math.cos(angle) * casual.double(0, radius);
    let y = Math.sin(angle) * casual.double(0, radius);
    let starSystem = new StarSystem({
      universeUuid,
      name,
      positionX: x,
      positionY: y
    });
    universe.push(starSystem);
    radius += casual.double(1, 5);
  }

  return universe;
}

export {
  createInitialUniverse
};
