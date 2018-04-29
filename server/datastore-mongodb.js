import mongoose from 'mongoose';

import * as Models from './models/mongoose';
import config from './config';

export function initMongo() {
  let mongodbUrl = config.mongodbUrl;
  mongodbUrl = mongodbUrl.replace('<dbuser>', config.mongodbUser);
  mongodbUrl = mongodbUrl.replace('<dbpassword>', config.mongodbPassword);
  mongoose.connect(mongodbUrl);
}

export function loadInitialTables() {

}
