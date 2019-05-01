import mongoose from 'mongoose';

var HeroSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    match: [/^[a-zA-Z- ']+$/]
  },
  heroClass: { type: mongoose.Schema.Types.ObjectId, ref: 'HeroClass' },
  baseHp: { type: Number, default: 0 },
  currentHp: { type: Number, default: 0 },
  baseAttack: { type: Number, default: 0 },
  baseDefense: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0},
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EquipmentSlot' }],
  traits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trait' }],
  traitPoints: { type: Number, default: 0 },
  moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }],
  abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability'}]
}, {timestamps: true});

HeroSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user,
    name: this.name,
    heroClass: this.heroClass,
    baseHp: this.baseHp,
    currentHp: this.currentHp,
    baseAttack: this.baseAttack,
    baseDefense: this.baseDefense,
    level: this.level,
    experience: this.experience,
    slots: this.slots,
    traits: this.traits,
    moves: this.moves,
    abilities: this.abilities
  };
};

var Hero = mongoose.model('Hero', HeroSchema);
export default Hero;
