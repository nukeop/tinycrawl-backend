import mongoose from 'mongoose';
import _ from 'lodash';

export const enumItemCategories = Object.freeze({
  CONSUMABLE: 'CONSUMABLE',
  USABLE: 'USABLE',
  EQUIPMENT: 'EQUIPMENT',
  VANITY: 'VANITY'
});

export const enumItemRarities = Object.freeze({
  DEFECTIVE: 'DEFECTIVE',
  STOCK: 'STOCK',
  AFTERMARKET: 'AFTERMARKET',
  HISTORICAL: 'HISTORICAL',
  STRANGE: 'STRANGE',
  TRANSCENDENT: 'TRANSCENDENT'
});

var InventoryItemSchema = mongoose.Schema({
  name: { type: String },
  charges: { type: Number, default: 0 },
  category: {
    type: String,
    enum: _.values(enumItemCategories)
  },
  rarity: {
    type: String,
    enum: _.values(enumItemRarities)
  },
  shortLore: { type: String },
  longLore: { type: String },
  essential: { type: Boolean },
  effect: { type: String },
  potency: { type: Number, default: 0 },
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInventory'
  }
}, { timestamps: true });

InventoryItemSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    category: this.category,
    shortLore: this.shortLore,
    longLore: this.longLore,
    charges: this.charges,
    essential: this.essential,
    effect: this.effect,
    potency: this.potency,
    inventory: this.inventory._id
  };
};

var InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
export default InventoryItem;
