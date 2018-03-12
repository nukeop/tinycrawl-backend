import path from 'path';
import low from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import dataIndex from './game/data/index.yaml';

const store = low(new FileAsync(path.resolve('../.data/db.json')));
initDatabase();

function initDatabase() {
  store.defaults({data: {}}).write();
  console.log(dataIndex);
}

export default store;
