import mongoose from 'mongoose';

var CharacterStatsSchema = mongoose.Schema({
  baseHp: { type: Number, default: 1 },
  baseAttack: { type: Number, default: 0 },
  baseDefense: { type: Number, default: 0 },

  maxHp: { type: Number, default: 1 },
  stress: { type: Number, default: 0 }
});

var CharacterStats = mongoose.model('CharacterStats', CharacterStatsSchema);
export default CharacterStats;
