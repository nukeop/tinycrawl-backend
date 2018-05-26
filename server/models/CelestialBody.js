import mongoose from 'mongoose';
import _ from 'lodash';

const enumCelestialBodyClassifications = Object.freeze({
  BLUE_MAIN_SEQUENCE_STAR: 'BLUE_MAIN_SEQUENCE_STAR',
  WHITE_MAIN_SEQUENCE_STAR: 'WHITE_MAIN_SEQUENCE_STAR',
  YELLOW_MAIN_SEQUENCE_STAR: 'YELLOW_MAIN_SEQUENCE_STAR',
  RED_MAIN_SEQUENCE_STAR: 'RED_MAIN_SEQUENCE_STAR',
  BLUE_GIANT: 'BLUE_GIANT',
  WHITE_GIANT: 'WHITE_GIANT',
  RED_GIANT: 'RED_GIANT',
  WHITE_DWARF: 'WHITE_DWARF',
  RED_DWARF: 'RED_DWARF',
  BROWN_DWARF: 'BROWN_DWARF',
  BLACK_HOLE: 'BLACK_HOLE',
  NEUTRON_STAR: 'NEUTRON_STAR',
  PULSAR: 'PULSAR',
  
  GAS_GIANT_PLANET: 'GAS_GIANT_PLANET',
  GAS_DWARF_PLANET: 'GAS_DWARF_PLANET',

  TERRESTRIAL_PLANET: 'TERRESTRIAL_PLANET',
  ICE_PLANET: 'ICE_PLANET',
  LAVA_PLANET: 'LAVA_PLANET',
  OCEAN_PLANET: 'OCEAN_PLANET',
  DWARF_PLANET: 'DWARF_PLANET',
  NANOTECH_PLANET: 'NANOTECH_PLANET',

  MOON: 'MOON',
  ASTEROID: 'ASTEROID',
  COMET: 'COMET',

  SPACE_STATION: 'SPACE_STATION',
  SPACE_HABITAT: 'SPACE_HABITAT',
  DERELICT_STATION: 'DERELICT_STATION',
  DYSON_SPHERE: 'DYSON_SPHERE'  
});

var CelestialBodySchema = mongoose.Schema({
  starSystem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StarSystem',
    required: [true, 'star system reference is required']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  classification: {
    type: String,
    enum: _.values(enumCelestialBodyClassifications),
    required: [true, 'celestial body classification is required']
  },
  satellites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CelestialBody'
  }],
  areas: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, {timestamps: true});

CelestialBodySchema.methods.serialize = function() {
  return {
    id: this._id,
    starSystem: this.starSystem,
    name: this.name,
    classification: this.classification,
    satellites: this.satellites,
    areas: this.areas
  };
};

var CelestialBody = mongoose.model('CelestialBody', CelestialBodySchema);
export default CelestialBody;
export { enumCelestialBodyClassifications };
