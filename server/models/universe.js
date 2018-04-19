import uuidv4 from 'uuid/v4';
import Model from './model';
import { getOrCreateTable } from '../utils';

class Universe extends Model {
  create(params) {
    Model.validateRequiredParams(params, [
      'userUuid'
    ], 'Universe');

    this.uuid = uuidv4();
    this.userUuid = params.userUuid;
  }

  serialize() {
    return {
      uuid: this.uuid,
      userUuid: this.userUuid
    };
  }

  save() {
    let table = getOrCreateTable(Universe.table);
    table.push(this.serialize()).write();
  }
}

Universe.table = 'universes';
export default Universe;
