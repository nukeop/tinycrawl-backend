import _ from 'lodash';

export function getOrCreateTable(tableName){
  let table = db.get(tableName).value();
  if (table === undefined) {
    db.set(tableName, []).write();
  }
  return db.get(tableName);
}

export function handleMongooseErrors(res) {
  return err => {
    res.status(400).json(_(err.errors).map((element, index) => {
      return {[`${index}`]: element.message};
    }).value());
  };
}
