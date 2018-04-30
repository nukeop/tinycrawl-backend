import mongoose from 'mongoose';

var EnvironmentSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  descriptions: [{ type: String }],
  features: [{ type:mongoose.Schema.Types.ObjectId, ref: 'EnvironmentalFeature' }]
});

var Environment = mongoose.model('Environment', EnvironmentSchema);
export default Environment;
