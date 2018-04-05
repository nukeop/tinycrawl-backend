import uuidv4 from 'uuid/v4';
import Model from './model';

const enumAllowedMarkerTypes = [
  'planet',
  'star',
  'artificial'
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
    this.parentMarker = params.parentMarker || null;
    this.satellites = [];
  }

  serialize() {
    return {
      uuid: this.uuid,
      universeUuid: this.universeUuid,
      name: this.name,
      type: this.type,
      parentMarker: this.parentMarker,
      satellites: this.satellites
    }
  }

  static deserialize(obj) {
    let result = new Marker();

    result.uuid = obj.uuid;
    result.universeUuid = obj.uuid;
    result.name = obj.name;
    result.type = obj.type;
    result.parentMarker = obj.parentMarker || null;
    result.satellites = obj.satellites || [];

    return result;
  }

  save() {
    let table = db.get(Marker.table);
    table.push(this.serialize()).write();
  }
}

Marker.table = 'markers';
export default Marker;
export { enumAllowedMarkerTypes };
