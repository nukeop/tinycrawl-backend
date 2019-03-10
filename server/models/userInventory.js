import mongoose from 'mongoose';
import _ from 'lodash';

import { serializeAll } from '../helpers';

var UserInventorySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Currency'}],
  amounts: [{ type: Number, default: 0 }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' }]
});

UserInventorySchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user,
    currencies: this.currencies,
    amounts: this.amounts,
    items: serializeAll(this.items)
  };
};

var UserInventory = mongoose.model('UserInventory', UserInventorySchema);
export default UserInventory;
