import mongoose from 'mongoose';

var EquipmentSlotSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  }
});

var EquipmentSlot = mongoose.model('EquipmentSlot', EquipmentSlotSchema);
export default EquipmentSlot;
