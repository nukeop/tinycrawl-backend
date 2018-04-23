import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import Model from './model';
import { getOrCreateTable } from '../utils';

const enumUserRoles = Object.freeze({
  ROOT_ROLE: 'ROOT_ROLE',
  ADMIN_ROLE: 'ADMIN_ROLE',
  USER_ROLE: 'USER_ROLE'
});

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
    this.role = enumUserRoles.USER_ROLE;

    return bcrypt.hash(params.password, 10);
  }

  static deserialize(obj) {
    let result = new User();

    result.uuid = obj.uuid;
    result.username = obj.username;
    result.displayName = obj.displayName;
    result.email = obj.email;
    result.password = obj.password;
    result.role = enumUserRoles[obj.role];

    return result;
  }

  serialize() {
    return {
      uuid: this.uuid,
      username: this.username,
      displayName: this.displayName,
      email: this.email,
      role: this.role
    }
  }

  save() {
    let table = getOrCreateTable(User.table);
    let serialized = this.serialize();
    serialized.password = this.password;
    table.push(serialized).write();
  }
}

User.table = 'users';
export default User;
export { enumUserRoles };
