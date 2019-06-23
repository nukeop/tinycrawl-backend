import mongoose from 'mongoose';

const Currency = mongoose.model('Currency');
const Inventory = mongoose.model('UserInventory');

export async function modCurrencyAmount(user, currencyCode, amount) {
  const inventory = await Inventory.findById(user.inventory);
  const currencies = await Currency.find();
  const currencyId = _.find(currencies, { code: currencyCode })._id;
  const currentAmount = inventory.currencies.get(currencyId.toString());

  if(currentAmount + amount < 0) {
    throw new Error('Insufficient funds to complete this transaction');
  }
  
  inventory.currencies.set(
    currencyId.toString(),
    currentAmount + amount
  );
  
  await inventory.save();
}
