import { expect } from 'chai';
import _ from 'lodash';

import NameGenerator from '../server/game/generators/names';
import * as UG from '../server/game/generators/universe';
import { StarSystem } from '../server/models';
import starNames from '../server/game/data/dictionaries/starNames.yaml';

describe('Name generator tests', () => {
  it('Creates a name generator with data and generates one name', () => {
    let starGenerator = new NameGenerator(starNames.segments, starNames.rules);
    let name = starGenerator.generate();
    expect(name).to.be.a('string');
    expect(name).to.have.lengthOf.above(0);
  });
});

describe('Universe generator tests', () => {
  it('Initializes a new universe', () => {
    let universe = UG.createInitialUniverse(10, 'abc');
    expect(universe).to.be.an('array').that.has.length(10);
    expect(_.sample(universe)).to.be.an.instanceof(StarSystem);
  });
});
