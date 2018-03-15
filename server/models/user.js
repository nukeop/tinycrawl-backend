import _ from 'lodash';
import Model from './model';

class User extends Model {
  create(params) {
    Model.validateRequiredParams(
      params,
      [
        'uuid'
      ],
      'User');

      this.uuid = params.uuid;
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
