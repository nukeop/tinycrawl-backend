import mongoose from 'mongoose';
import seedrandom from 'seedrandom';

import NameGenerator from './names';
import planetNamesDictionary from '../data/dictionaries/planetNames.yaml'; 

const Area = mongoose.model('Area');
const Environment = mongoose.model('Environment');

class AreaFactory {
  constructor(user) {
    this.user = user;
  }

  async generate() {
    const temprng = seedrandom.alea();
    const seed = temprng.int32().toString(16);

    const environments = await Environment.find({});
    const environment = _.sample(environments);

    const nameGenerator = new NameGenerator(
      planetNamesDictionary.segments,
      planetNamesDictionary.rules
    );
    const name = nameGenerator.generate();

    return new Area({
      user: this.user,
      sectors: [],
      seed,
      name,
      environment
    });
  }
}

export default AreaFactory;
