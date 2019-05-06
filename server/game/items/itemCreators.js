import mongoose from 'mongoose';

import {
  enumItemCategories,
  enumItemRarities
} from '../../models/inventoryItem';
import { itemEffects } from './effects';

const InventoryItem = mongoose.model('InventoryItem');

const createStrangeMatterPod = potency => {
  return new InventoryItem({
    name: 'Strange Matter Pod',
    charges: 1,
    category: enumItemCategories.CONSUMABLE,
    rarity: enumItemRarities.STOCK,
    shortLore: 'Use to gain raw Strange Matter.',
    longLore: `
    Strange Matter is a form of matter so compressed it exists as a
    liquid made of quarks. In nature, it is only found in strange
    stars, which necessitates use of special containers to transport
    it.  
    `,
    essential: false,
    effect: itemEffects.ADD_STRANGE_MATTER,
    inventory: null,
    potency
  });
};

const createPipCrystal = potency => {
  return new InventoryItem({
    name: 'Pip Crystal',
    charges: 1,
    category: enumItemCategories.CONSUMABLE,
    rarity: enumItemRarities.STOCK,
    shortLore: 'Use to gain spendable Pips',
    longLore: `
    Pips, or Planck's Indexed Particles, became a universally
    accepted currency after the discovery that revealing a quantum
    index makes matter replication easier by orders of magnitude.

    Since then, they've found use as a currency, fuel, in
    industrial manufacturing, and many other fields.`,
    essential: false,
    effect: itemEffects.ADD_PIPS,
    inventory: null,
    potency
  });
};

export const inventoryItems = Object.freeze({
  STRANGE_MATTER_POD: 'STRANGE_MATTER_POD',
  PIP_CRYSTAL: 'PIP_CRYSTAL'
});

export const createInventoryItem = (name, options) => {
  switch(name) {
  case inventoryItems.STRANGE_MATTER_POD:
    return createStrangeMatterPod(options.potency);
  case inventoryItems.PIP_CRYSTAL:
    return createPipCrystal(options.potency);
  default:
    return null;
  }
};
