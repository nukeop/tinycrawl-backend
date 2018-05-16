import mongoose from 'mongoose';

var AbilitySchema = mongoose.Schema({
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

AbilitySchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    description: this.description,
    flavor: this.flavor
  };
};

var Ability = mongoose.model('Ability', AbilitySchema);
export default Ability;
