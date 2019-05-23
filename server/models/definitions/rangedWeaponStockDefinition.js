import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

const RangedWeaponStockDefinitionSchema = mongoose.Schema({
  name: { type: String },
  manufacturer: { type: String },
  category: {
    type: String,
    enum: _.values(enumItemCategories),
    default: enumItemCategories.WEAPON_PART
  },
  rarity: {
    type: String,
    enum: _.values(enumItemRarities)
  },
  accuracyBonus: {
    type: Number,
    default: 0
  },
  reloadSpeedBonus: {
    type: Number,
    default: 0
  },
  recoilBonus: {
    type: Number,
    default: 0
  },
  bashingBonus: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


const RangedWeaponStockDefinition = mongoose.model(
  'RangedWeaponStockDefinition',
  RangedWeaponStockDefinitionSchema
);
export default RangedWeaponStockDefinition;
