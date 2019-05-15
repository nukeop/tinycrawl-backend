import mongoose from 'mongoose';

import { NotFound, BadRequest } from '../errors';
import { createCRUDforResource } from './meta';
import {
  requireBasicAuth,
  requireToken,
  requireSameUserAuthenticated,
  requiredParams,
  requiredRole,
  conditionParam
} from '../middleware/routeDecorators';
import {
  useItem
} from '../game/items/effects';
import { enumItemCategories } from '../models/inventoryItem';

const User = mongoose.model('User');
const Inventory = mongoose.model('UserInventory');
const InventoryItem = mongoose.model('InventoryItem');

function createEndpoint(router) {
  createCRUDforResource(router, [], 'items', InventoryItem);
  
  router.post('/items/:uuid/use', [
    requireToken
  ], async (req, res) => {
    const item = await InventoryItem.findById(req.params.uuid);
    const inventory = await Inventory.findById(item.inventory);
    const owner = await User.findById(inventory.user);

    if (!_.isEqual(owner._id, req.authorizedByToken._id)) {
      BadRequest(res, 'Only the owner of an item can use it');
      return;
    }

    if (!(_.isEqual(item.category, enumItemCategories.CONSUMABLE) ||
          _.isEqual(item.category, enumItemCategories.USABLE))) {
      BadRequest(res, 'This item cannot be used');
    }

    if(item.charges > 0) {
      useItem(item, owner, inventory);
      item.charges -=1;
      await item.save();
    }

    if (item.charges < 1 && _.isEqual(item.category, enumItemCategories.CONSUMABLE)) {
      inventory.items.pull(item._id);
      await inventory.save();
      await InventoryItem.findByIdAndDelete(item._id);
    }
    
    res.status(200).send();
  });
}

export default createEndpoint;
