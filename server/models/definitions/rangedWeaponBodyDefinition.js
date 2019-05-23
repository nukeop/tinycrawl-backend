import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

import {
  enumRangedWeaponBodyTypes,
  enumRangedWeaponFiringMode
} from '../rangedWeapon';

const RangedWeaponBodyDefinitionSchema = mongoose.Schema({
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
  type: {
    type: String,
    enum: _.values(enumRangedWeaponBodyTypes)
  },
  firingModes: [{
    type: String,
    enum: _.values(enumRangedWeaponFiringMode)
  }],
  effects: [{ type: String }],
  damage: {
    type: Number, default: 0
  },
  bashing: {
    type: Number, default: 0
  },
  recoil: {
    type: Number, default: 0
  }
}, { timestamps: true });

const RangedWeaponBodyDefinition = mongoose.model(
  'RangedWeaponBodyDefinition',
  RangedWeaponBodyDefinitionSchema
);
export default RangedWeaponBodyDefinition;
