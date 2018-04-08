import _ from 'lodash';
import shortid from 'shortid';
import Model from './model';

class AuthToken extends Model {
  create(params) {
    Model.validateRequiredParams(params, ['userUuid'], 'AuthToken');

    this.id = shortid.generate();
    this.userUuid = params.userUuid;
  }

  serialize() {
    return {
      id: this.id,
      userUuid: this.userUuid
    }
  }

  save() {
    let table = db.get(AuthToken.table);
    table.push(this.serialize()).write();
  }
}

AuthToken.table = 'authtokens';
export default AuthToken;
