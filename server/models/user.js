import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import Model from './model';

class User extends Model {
  create(params) {
    Model.validateRequiredParams(params, [], 'User');

    this.uuid = uuidv4();
  }

    serialize() {
      return {
        uuid: this.uuid
      }
    }

    save(db) {
      let table = db.get(User.table);
      table.push(this.serialize()).write();
    }
  }

User.table = 'users';

export default User;
