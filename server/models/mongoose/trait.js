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
});

var Trait = mongoose.model('Trait', TraitSchema);
export default Trait;
