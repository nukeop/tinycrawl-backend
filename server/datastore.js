import _ from 'lodash';
import mongoose from 'mongoose';

import * as Models from './models';
import config from './config';
import dataIndex from './game/data/index.yaml';

export function initMongo() {
  let mongodbUrl = config.mongodbUrl;
  mongodbUrl = mongodbUrl.replace('<dbuser>', config.mongodbUser);
  mongodbUrl = mongodbUrl.replace('<dbpassword>', config.mongodbPassword);
  mongoose.connect(mongodbUrl);
}

function loadDefaultDefinitions(model, data) {
  _.forEach(data.data, obj => {
    model.findOne({name: obj.name})
    .then(existing => {
      if (!existing) {
        existing = new model();
      }

      _.forEach(obj, (attr, attrName) => {
        existing[attrName] = attr;
      });
      existing.save();
    });
  });
}

function loadDefinitionsWithForeignKeys(model, data, foreign) {
  _.forEach(data.data, entry => {

    model.findOne({name: entry.name})
    .then(existing => {
      if (!existing) {
        existing = new model();
      }

      _.forEach(entry, (attr, attrName) => {
        if (!_.includes(Object.keys(foreign), attrName)) {
          existing[attrName] = attr;
        }
      });

      Promise.all(_.map(foreign, (modelName, attr) => {
        let foreignKeyModel = mongoose.model(modelName);

        return Promise.all(_.map(entry[attr], foreignKeyEntry => {
          return foreignKeyModel.findOne({name: foreignKeyEntry});
        }))
        .then(results => {
          existing[attr] = results;
        });
      }))
      .then(results => {
        existing.save();
      });
    });

  });
}

function loadDefinition(table, model, data) {
  switch (table.name) {
    case 'Environments':
    loadDefinitionsWithForeignKeys(model, data, {
      features: 'EnvironmentalFeature'
    });
    return;
    case 'HeroClasses':
    loadDefinitionsWithForeignKeys(model, data, {
      slots: 'EquipmentSlot',
      moves: 'Move',
      abilities: 'Ability'
    });
    return;
    default:
    loadDefaultDefinitions(model, data);
  }
}

export function loadInitialTables() {
  console.log('Loading definitions (mongoDB)...');

  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);

  _.forEach(dataIndex.tables, table => {
    if (table.schema) {
       console.log(`Loading definitions for table ${table.name}...`);
       let model = mongoose.model(table.schema);
       let data = eval(req(table.file));
       loadDefinition(table, model, data);
    }
  });
}
