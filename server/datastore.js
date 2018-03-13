import path from 'path';
import _ from 'lodash';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import dataIndex from './game/data/index.yaml';

const store = low(new FileAsync(".data/db.json"));
const definitions = 'definitions.';

export function initDatabase(db) {
  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);
  const tableNames = _.map(dataIndex.tables, table => {
    return eval(req(table.file)).table;
  });
  let initialData = {};
  _.forEach(tableNames, name => {
    initialData[`${definitions}${name}`] = [];
  });
  db.defaults(initialData).write();
}

export function loadInitialTables(db) {
  console.log('Loading definitions...');
  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);
  _.forEach(dataIndex.tables, table => {

    console.log(`Loading defintions for table ${table.name}...`);
    let data = eval(req(table.file));
    _.forEach(data.data, obj => {
      //Check for uniqueness by definition name
      let existing = db.get(`${definitions}${data.table}`)
      .filter({name: obj.name})
      .value().length;

      if (existing === 0) {
        db.get(`${definitions}${data.table}`)
        .push(obj)
        .write();
      }
    });
  });
}

export default store;
