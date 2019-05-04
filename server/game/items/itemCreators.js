import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../../models/inventoryItem';
import { itemEffects } from './effects';

const InventoryItem = mongoose.model('InventoryItem');

const createStrangeMatterPod = amount => {
  return new InventoryItem({
    name: 'Strange Matter Pod',
    charges: 1,
    category: enumItemCategories.CONSUMABLE,
    rarity: enumItemRarities.STOCK,
    shortLore: '',
    longLore: '',
    essential: false,
    effect: itemEffects.ADD_STRANGE_MATTER,
    potency: amount,
    inventory: null
  });
};

export const inventoryItems = Object.freeze({
  STRANGE_MATTER_POD: 'STRANGE_MATTER_POD'
});

export const createInventoryItem = (name, options) => {
  switch(name) {
  case inventoryItems.STRANGE_MATTER_POD:
    return createStrangeMatterPod(options.amount);
  default:
    return null;
  }
};
