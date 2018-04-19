export function getOrCreateTable(tableName){
  let table = db.get(tableName).value();
  if (table === undefined) {
    db.set(tableName, []).write();
  }
  return db.get(tableName);
}
