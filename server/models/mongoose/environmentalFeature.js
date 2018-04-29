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
});

var EnvironmentalFeature = mongoose.model('EnvironmentalFeature', EnvironmentalFeatureSchema);
export default EnvironmentalFeature;
