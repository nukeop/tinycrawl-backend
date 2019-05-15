import mongoose from 'mongoose';

const Currency = mongoose.model('Currency');

export const itemEffects = Object.freeze({
  ADD_STRANGE_MATTER: 'ADD_STRANGE_MATTER',
  ADD_PIPS: 'ADD_PIPS'
});

const addCurrency = async (owner, inventory, amount, currencyCode) => {
  const currencies = await Currency.find();
  const currencyId = _.find(currencies, { code: currencyCode })._id;
  const currentAmount = inventory.currencies.get(currencyId.toString());
  inventory.currencies.set(currencyId.toString(), currentAmount + amount);
  
  await inventory.save();
};

export const useItem = (item, owner, inventory) => {
  switch(item.effect) {
  case itemEffects.ADD_STRANGE_MATTER:
    addCurrency(owner, inventory, item.potency, 'SM');
    break;
  case itemEffects.ADD_PIPS:
    addCurrency(owner, inventory, item.potency, 'PIP');
    break;
  default:
    return;
  }
};
