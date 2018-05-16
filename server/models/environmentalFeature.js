import mongoose from 'mongoose';

var EnvironmentalFeatureSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  description: { type: String }
}, {timestamps: true});

EnvironmentalFeatureSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    description: this.description
  };
};

var EnvironmentalFeature = mongoose.model('EnvironmentalFeature', EnvironmentalFeatureSchema);
export default EnvironmentalFeature;
