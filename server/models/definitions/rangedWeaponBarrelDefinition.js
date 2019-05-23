import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

import {
  enumRangedWeaponBodyTypes
} from '../rangedWeapon';

const RangedWeaponBarrelDefinitionSchema = mongoose.Schema({
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
  compatibleBodies: [{
    type: String,
    enum: _.values(enumRangedWeaponBodyTypes)
  }],
  accuracyBonus: {
    type: Number,
    default: 0
  },
  damageBonus: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


const RangedWeaponBarrelDefinition = mongoose.model(
  'RangedWeaponBarrelDefinition',
  RangedWeaponBarrelDefinitionSchema
);
export default RangedWeaponBarrelDefinition;
