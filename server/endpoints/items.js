import mongoose from 'mongoose';

import { NotFound } from '../errors';
import { createCRUDforResource } from './meta';

const InventoryItem = mongoose.model('InventoryItem');

function createEndpoint(router) {
  createCRUDforResource(router, [], 'items', InventoryItem);
}

export default createEndpoint;
