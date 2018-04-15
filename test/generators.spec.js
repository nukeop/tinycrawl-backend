import { expect } from 'chai';
import NameGenerator from '../server/game/generators/names';
import * as UG from '../server/game/generators/universe';

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
  it('Generates stars', () => {
    let stars = UG.generateStars('abc', 5);
    expect(stars).to.be.an('array');
    expect(stars).to.have.lengthOf(5);
  });
});
