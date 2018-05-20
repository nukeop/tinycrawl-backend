import mongoose from 'mongoose';
import _ from 'lodash';

const enumCelestialBodyClassifications = Object.freeze({
  
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
    
  }
}, {timestamps: true});

var CelestialBody = mongoose.model('CelestialBody', CelestialBodySchema);
export default CelestialBody;
