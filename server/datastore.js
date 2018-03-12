import path from 'path';
import _ from 'lodash';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import dataIndex from './game/data/index.yaml';

const store = low(new FileAsync(".data/db.json"));

export function initDatabase(db) {
  db.defaults({data: {}}).write();
}

export function loadInitialTables(db) {
  const req = require.context("json-loader!yaml-loader!./game/data", true, /yaml$/);
  _.forEach(dataIndex.tables, table => {
    let data = eval(req(table.file));
    console.log(data);
  });
}

export default store;
