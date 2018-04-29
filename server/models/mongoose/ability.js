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
});

var Ability = mongoose.model('Ability', AbilitySchema);
export default Ability;
