import mongoose from 'mongoose';

var AreaSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
    user: this.user,
    name: this.name,
    environment: this.environment,
    sectors: this.sectors
  };
};

var Area = mongoose.model('Area', AreaSchema);
export default Area;
