import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from './inventoryItem';

export const enumRangedWeaponBodyTypes = Object.freeze({
  HANDGUN: 'HANDGUN',
  SMG: 'SMG',
  SHOTGUN: 'SHOTGUN',
  ASSAULT: 'ASSAULT',
  PROJECTILE: 'PROJECTILE'
});

export const enumRangedWeaponFiringMode = Object.freeze({
  SINGLE: 'SINGLE',
  BURST: 'BURST',
  AUTO: 'AUTO'
});

const RangedWeaponSchema = mongoose.Schema({
  name: { type: String },
  category: {
    type: String,
    enum: _.values(enumItemCategories),
    default: enumItemCategories.EQUIPMENT
  },
  rarity: {
    type: String,
    enum: _.values(enumItemRarities)
  },
  shortLore: { type: String },
  longLore: { type: String },

  body: { type: mongoose.Schema.Types.ObjectId },
  magazine: { type: mongoose.Schema.Types.ObjectId },
  grip: { type: mongoose.Schema.Types.ObjectId },
  stock: { type: mongoose.Schema.Types.ObjectId },
  sight: { type: mongoose.Schema.Types.ObjectId },
  barrel: { type: mongoose.Schema.Types.ObjectId },
  accessory: { type: mongoose.Schema.Types.ObjectId },
  
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInventory'
  }
}, { timestamps: true });

const RangedWeapon = mongoose.model('RangedWeapon',
  RangedWeaponSchema);
export default RangedWeapon;
