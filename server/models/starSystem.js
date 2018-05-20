import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

var StarSystemSchema = mongoose.Schema({
  universe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Universe',
    required: [true, 'universe reference is required']
  },
  name: {
    type: String,
    unique: [true, 'star system name must be unique'],
    required: [true, 'star system name is required'],
    index: true
  },
  positionX: { type: Number, default: 0 },
  positionY: { type: Number, default: 0 },
  celestialObjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CelestialBody'
  }],
  centers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CelestialBody'
  }]
}, {timestamps: true});

StarSystemSchema.plugin(uniqueValidator);

StarSystemSchema.methods.serialize = function() {
  return {
    id: this._id,
    universe: this.universe,
    name: this.name,
    positionX: this.positionX,
    positionY: this.positionY,
    celestialObjects: this.celestialObjects,
    centers: this.centers
  };
};

var StarSystem = mongoose.model('StarSystem', StarSystemSchema);
export default StarSystem;
