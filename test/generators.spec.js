import NameGenerator from '../server/game/generators/names';

import starNames from './data/starNames';

describe('Name generator tests', () => {
  it('Creates a name generator with data and generates one name', () => {
    let starGenerator = new NameGenerator(starNames.segments, starNames.rules);
    let name = starGenerator.generate();
  });
});
