import uuidv4 from 'uuid/v4';
import Model from './model';
import { getOrCreateTable } from '../utils';

const starClassificationEnum = Object.freeze({
  BLUE_MAIN_SEQUENCE: 'BLUE_MAIN_SEQUENCE',
  WHITE_MAIN_SEQUENCE: 'WHITE_MAIN_SEQUENCE',
  YELLOW_MAIN_SEQUENCE: 'YELLOW_MAIN_SEQUENCE',
  RED_MAIN_SEQUENCE: 'RED_MAIN_SEQUENCE',
  BLUE_GIANT: 'BLUE_GIANT',
  WHITE_GIANT: 'WHITE_GIANT',
  RED_GIANT: 'RED_GIANT',
  WHITE_DWARF: 'WHITE_DWARF',
  RED_DWARF: 'RED_DWARF',
  BROWN_DWARF: 'BROWN_DWARF',
  BLACK_HOLE: 'BLACK_HOLE',
  NEUTRON_STAR: 'NEUTRON_STAR',
  PULSAR: 'PULSAR'
});

class Star extends Model {
  create(params) {
    Model.validateRequiredParams(params, [
      'starSystemUuid',
      'name',
      'classification'
    ], 'Star');

    this.uuid = uuidv4();
    this.starSystemUuid = params.starSystemUuid;
    this.name = params.name;
    this.classification = starClassificationEnum[params.classification];
  }

  serialize() {
    return {
      uuid: this.uuid,
      starSystemUuid: this.starSystemUuid,
      name: this.name,
      classification: this.classification
    };
  }

  save() {
    let table = getOrCreateTable(Star.table);
    table.push(this.serialize()).write();
  }
}

Star.table = 'stars';
export default Star;
