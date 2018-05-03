import _ from 'lodash';
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

EnvironmentSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    descriptions: this.descriptions,
    features: this.features
  };
};

var Environment = mongoose.model('Environment', EnvironmentSchema);
export default Environment;
