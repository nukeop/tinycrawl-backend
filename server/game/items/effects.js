import mongoose from 'mongoose';

import { modCurrencyAmount } from '../currencies';

const Currency = mongoose.model('Currency');

export const itemEffects = Object.freeze({
  ADD_STRANGE_MATTER: 'ADD_STRANGE_MATTER',
  ADD_PIPS: 'ADD_PIPS'
});

const addCurrency = async (owner, currencyCode, amount) => {
  await modCurrencyAmount(owner, currencyCode, amount);
};

export const useItem = async (item, owner, inventory) => {
  switch(item.effect) {
  case itemEffects.ADD_STRANGE_MATTER:
    await addCurrency(owner, 'SM', item.potency);
    break;
  case itemEffects.ADD_PIPS:
    await addCurrency(owner, 'PIP', item.potency);
    break;
  default:
    return;
  }
};
