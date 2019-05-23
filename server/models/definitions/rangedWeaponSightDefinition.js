import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

const RangedWeaponSightDefinitionSchema = mongoose.Schema({
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
  }
}, { timestamps: true });


const RangedWeaponSightDefinition = mongoose.model(
  'RangedWeaponSightDefinition',
  RangedWeaponSightDefinitionSchema
);
export default RangedWeaponSightDefinition;
