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
  flavor: { type: String },
  categories: [{ type: String }],
  points: { type: Number },
  prerequisites: [{ type: String }],
  excludes: [{ type: String }]
}, { timestamps: true });

TraitSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    description: this.description,
    flavor: this.flavor,
    categories: this.categories,
    points: this.points,
    prerequisites: this.prerequisites,
    excludes: this.excludes
  };
};

var Trait = mongoose.model('Trait', TraitSchema);
export default Trait;
