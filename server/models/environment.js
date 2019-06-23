import mongoose from 'mongoose';

var EnvironmentSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  recommended_levels: {
    from: { type: Number },
    to: { type: Number }
  },
  descriptions: [{ type: String }],
  features: [{ type:mongoose.Schema.Types.ObjectId, ref: 'EnvironmentalFeature' }]
}, {timestamps: true});

EnvironmentSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    recommended_levels: this.recommended_levels,
    descriptions: this.descriptions,
    features: this.features
  };
};

var Environment = mongoose.model('Environment', EnvironmentSchema);
export default Environment;
