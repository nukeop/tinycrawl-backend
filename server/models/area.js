import mongoose from 'mongoose';

var AreaSchema = mongoose.Schema({
  name: { type: String },
  seed: { type: String },
  environment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Environment'
  },
  sectors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sector'
  }]
}, { timestamps: true });

AreaSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    environment: this.environment,
    sectors: this.sectors
  };
};

var Area = mongoose.model('Area', AreaSchema);
export default Area;
