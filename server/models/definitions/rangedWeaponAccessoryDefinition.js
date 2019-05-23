import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../inventoryItem';

import {
  enumRangedWeaponBodyTypes
} from '../rangedWeapon';

const RangedWeaponAccessoryDefinitionSchema = mongoose.Schema({
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
  effects: [{ type: String }]
}, { timestamps: true });


const RangedWeaponAccessoryDefinition = mongoose.model(
  'RangedWeaponAccessoryDefinition',
  RangedWeaponAccessoryDefinitionSchema
);
export default RangedWeaponAccessoryDefinition;
