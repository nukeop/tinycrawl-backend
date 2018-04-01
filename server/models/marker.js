import uuidv4 from 'uuid/v4';
import Model from './model';

const enumAllowedMarkerTypes = [
  'planet',
  'star'
];

class Marker extends Model {
  create(params) {
    Model.validateRequiredParams(params, [
      'universeUuid',
      'name',
      'type'
    ], 'Marker');

    Model.validateEnum(params.type,enumAllowedMarkerTypes);

    this.uuid = uuidv4();
    this.universeUuid = params.universeUuid;
    this.name = params.name;
    this.type = params.type;
  }

  serialize() {
    return {
      uuid: this.uuid,
      universeUuid: this.universeUuid,
      name: this.name,
      type: this.type
    }
  }

  save() {
    let table = db.get(Marker.table);
    table.push(this.serialize()).write();
  }
}

Marker.table = 'markers';
export default Marker;
export { enumAllowedMarkerTypes };
