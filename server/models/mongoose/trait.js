import mongoose from 'mongoose';

var TraitSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  description: { type: String },
  flavor: { type: String }
}, {timestamps: true});

TraitSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    description: this.description,
    flavor: this.flavor
  };
};

var Trait = mongoose.model('Trait', TraitSchema);
export default Trait;
