import mongoose from 'mongoose';

import { BadRequest, NotFound } from '../errors';
import { enumUserRoles } from '../models/user';
import {
  requiredParams,
  requiredRole,
  validateSchema
} from '../middleware/routeDecorators';
import {
  createInventoryItem,
  inventoryItems
} from '../game/items/itemCreators';
import {
  actionGiveItemSchema
} from '../schemas/actions';

const Inventory = mongoose.model('UserInventory');
const User = mongoose.model('User');

function createEndpoint(router) {
  router.post('/actions/giveItem', [
    requiredRole([enumUserRoles.ROOT_ROLE, enumUserRoles.ADMIN_ROLE]),
    validateSchema(actionGiveItemSchema)
  ], async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (_.isNil(user)) {
      BadRequest(res, 'User is required');
      return;
    }
    
    for(let i = 0; i<req.body.amount; i++) {
      const item = createInventoryItem(
        _.get(inventoryItems, req.body.item),
        { potency: req.body.potency }
      );
      
      if (!_.isNil(item)) {
        item.inventory = user.inventory;
        await item.save();

        await Inventory.findByIdAndUpdate(
          user.inventory._id,
          {
            '$push': { 'items': item._id }
          }
        );
      }
    }
        
    res.status(200).send();
  });
}

export default createEndpoint;
