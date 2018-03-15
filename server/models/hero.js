import uuidv4 from 'uuid/v4';
import Model from './model';

class Hero extends Model {
  create(params) {
    Model.validateRequiredParams(
      params,
      ['name', 'heroDefinition'],
      'Hero'
    );

    this.uuid = uuidv4();
    this.name = params.name;
    this.heroClass =  { name: params.heroDefinition.name, prettyName: params.heroDefinition.name };
    this.stats = params.heroDefinition.startingStats;
    this.slots = params.heroDefinition.slots;
  }

  serialize() {
    return {
      uuid: this.uuid,
      name: this.name,
      heroDefinition: this.heroDefinition
    };
  }

  save() {
    let table = db.get(Hero.table);
    table.push(this.serialize()).write();
  }
}

Hero.table = 'heroes';
export default Hero;
