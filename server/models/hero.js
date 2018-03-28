import uuidv4 from 'uuid/v4';
import Model from './model';

class Hero extends Model {
  create(params) {
    Model.validateRequiredParams(
      params,
      ['userUuid', 'name', 'heroDefinition'],
      'Hero'
    );

    this.uuid = uuidv4();
    this.userUuid = params.userUuid;
    this.name = params.name;
    this.heroClass =  { name: params.heroDefinition.name, prettyName: params.heroDefinition.name };
    this.stats = params.heroDefinition.startingStats;
    this.slots = params.heroDefinition.slots;
    this.traits = [];
    this.moves = params.heroDefinition.moves;
    this.abilities = params.heroDefinition.abilities;
  }

  serialize() {
    return {
      uuid: this.uuid,
      userUuid: this.userUuid,
      name: this.name,
      heroClass: this.heroClass,
      stats: this.stats,
      slots: this.slots,
      traits: this.traits,
      moves: this.moves
    };
  }

  save() {
    let table = db.get(Hero.table);
    table.push(this.serialize()).write();
  }
}

Hero.table = 'heroes';
export default Hero;
