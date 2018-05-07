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

HeroClassSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    baseHp: this.baseHp,
    baseAttack: this.baseAttack,
    baseDefense: this.baseDefense,
    slots: this.slots,
    moves: this.moves,
    abilities: this.abilities,
    unlock_condition: this.unlock_condition
  };
};

var HeroClass = mongoose.model('HeroClass', HeroClassSchema);
export default HeroClass;
