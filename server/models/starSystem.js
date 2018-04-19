import uuidv4 from 'uuid/v4';
import Model from './model';
import { getOrCreateTable } from '../utils';

class StarSystem extends Model {
  create(params) {
    Model.validateRequiredParams(params, [
      'universeUuid',
      'name',
      'positionX',
      'positionY'
    ], 'Marker');

    this.uuid = uuidv4();
    this.universeUuid = params.universeUuid;
    this.name = params.name;
    this.positionX = params.positionX;
    this.positionY = params.positionY;

    // List of all astronomical and artificially created bodies in the system
    this.bodies = [];

    // List of all objects in the center of the system, typically a star or multiple stars
    this.centers = [];
  }

  serialize() {
    return {
      uuid: this.uuid,
      universeUuid: this.universeUuid,
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      bodies: this.bodies,
      centers: this.centers
    }
  }

  save() {
    let table = getOrCreateTable(StarSystem.table);
    table.push(this.serialize()).write();
  }
}

StarSystem.table = 'starSystems';
export default StarSystem;
