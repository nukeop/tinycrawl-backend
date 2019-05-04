import mongoose from 'mongoose';

import { serializeAll } from '../helpers';

var UserInventorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currencies: { type: Map, of: Number },  
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }]
});

UserInventorySchema.methods.initializeCurrencies = function(currencies) {
  _.forEach(currencies, currency => {
    if(_.isNil(_.get(this.currencies, currency._id))) {
      this.currencies.set(currency._id.toString(), 0);
    }
  });
};

UserInventorySchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user,
    currencies: this.currencies,
    amounts: this.amounts,
    items: this.items
  };
};

var UserInventory = mongoose.model('UserInventory', UserInventorySchema);
export default UserInventory;
