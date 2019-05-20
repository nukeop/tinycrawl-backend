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
  firingMode: {
    type: String,
    enum: _.values(enumRangedWeaponFiringMode)
  },
  damage: {
    type: Number, default: 0
  },
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInventory'
  }
}, { timestamps: true });

const RangedWeaponBodyDefinition = mongoose.model(
  'RangedWeaponBodyDefinition',
  RangedWeaponBodyDefinitionSchema
);
export default RangedWeaponBodyDefinition;
