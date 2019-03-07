import mongoose from 'mongoose';

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
    amounts: this.amounts
  };
};

var UserInventory = mongoose.model('UserInventory', UserInventorySchema);
export default UserInventory;
