import path from 'path';
import _ from 'lodash';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import dataIndex from './game/data/index.yaml';

const store = low(new FileAsync(".data/db.json"));
const definitions = 'definitions';

export function initDatabase(db) {
  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);
  const tableNames = _.map(dataIndex.tables, table => {
    return eval(req(table.file)).table;
  });
  let defaults = {
    definitions: {},
    users: []
  };
  db.defaults(defaults).write();
}

export function loadInitialTables(db) {
  console.log('Loading definitions...');
  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);
  _.forEach(dataIndex.tables, table => {

    console.log(`Loading definitions for table ${table.name}...`);
    let data = eval(req(table.file));
    _.forEach(data.data, obj => {

      // Retrieve the table corresponding to this resource or create it if it doesn't exist
      let table = db.get(`${definitions}.${data.table}`);
      if (table.value() === undefined) {
        db.set(`${definitions}.${data.table}`, []).write();
        table = db.get(`${definitions}.${data.table}`);
      }

      // Update definitions by removing existing ones first
      table
      .remove({name: obj.name})
      .write();

      table
      .push(obj)
      .write();
    });
  });
}

export default store;
