import mongoose from 'mongoose';
import _ from 'lodash';

const enumItemCategories = Object.freeze({
  CONSUMABLE: 'CONSUMABLE',
  VANITY: 'VANITY'
});

var InventoryItemSchema = mongoose.Schema({
  name: { type: String },
  category: {
    type: String,
    enum: _.values(enumItemCategories)
  },
  shortLore: { type: String },
  longLore: { type: String },
});

InventoryItemSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    category: this.category,
    shortLore: this.shortLore,
    longLore: this.longLore
  };
};

var InventoryItem = mongoose.model('InventoryItem', InventoryItemSchema);
export default InventoryItem;
export { enumItemCategories };
