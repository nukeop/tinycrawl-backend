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
    }
  }
