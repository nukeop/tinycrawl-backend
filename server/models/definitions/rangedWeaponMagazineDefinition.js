import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

import {
  enumRangedWeaponBodyTypes
} from '../rangedWeapon';

const RangedWeaponMagazineDefinitionSchema = mongoose.Schema({
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
  capacity: { type: Number, default: 1 },
  reloadDelay: { type: Number, default: 1000 },
  effect: { type: String },
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInventory'
  }
}, { timestamps: true });

const RangedWeaponMagazineDefinition = mongoose.model(
  'RangedWeaponMagazineDefinition',
  RangedWeaponMagazineDefinitionSchema
);
export default RangedWeaponMagazineDefinition;
