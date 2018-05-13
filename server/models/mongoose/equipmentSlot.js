import mongoose from 'mongoose';

var EquipmentSlotSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  }
}, {timestamps: true});

EquipmentSlotSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name
  };
};

var EquipmentSlot = mongoose.model('EquipmentSlot', EquipmentSlotSchema);
export default EquipmentSlot;
