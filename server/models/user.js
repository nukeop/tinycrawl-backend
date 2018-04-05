import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import Model from './model';

class User extends Model {
  create(params) {
    if(!params) {
      return;
    }

    Model.validateRequiredParams(params, ['username', 'email', 'password'], 'User');

    this.uuid = uuidv4();
    this.username = params.username;
    this.displayName = params.username;
    this.email = params.email;

    return bcrypt.hash(params.password, 10);
  }

  static deserialize(obj) {
    let result = new User();

    result.uuid = obj.uuid;
    result.username = obj.username;
    result.displayName = obj.displayName;
    result.email = obj.email;
    result.password = obj.password;

    return result;
  }

  serialize() {
    return {
      uuid: this.uuid,
      username: this.username,
      displayName: this.displayName,
      email: this.email
    }
  }

  save() {
    let table = db.get(User.table);
    table.push(this.serialize()).write();
  }
}

User.table = 'users';
export default User;
