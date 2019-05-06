import * as yup from 'yup';

import { inventoryItems } from '../game/items/itemCreators';

export const actionGiveItemSchema = yup.object().shape({
  userId: yup.string().required(),
  item: yup.string().required().oneOf(_.values(inventoryItems)),
  amount: yup.number().required().positive().integer(),
  potency: yup.number().required().positive().integer()
});
