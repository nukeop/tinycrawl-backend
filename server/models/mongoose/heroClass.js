import mongoose from 'mongoose';

var HeroClassSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  baseHp: { type: Number, default: 0 },
  baseAttack: { type: Number, default: 0 },
  baseDefense: { type: Number, default: 0 },
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentSlot' }],
  moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }],
  abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability'}],
  unlock_condition: { type: String }
});

var HeroClass = mongoose.model('HeroClass', HeroClassSchema);
export default HeroClass;
