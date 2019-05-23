import mongoose from 'mongoose';

const DamageTypeSchema = mongoose.Schema({
  name: { type: String },
  color: { type: String }
});

DamageTypeSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    color: this.color
  };
};

const DamageType = mongoose.model(
  'DamageType',
  DamageTypeSchema
);
export default DamageType;
