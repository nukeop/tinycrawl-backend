import _ from 'lodash';

class Model {
  constructor(params) {
    this.create(params);
  }

  create(params) {
    console.error('Model should be inherited from and never instantiated directly');
  }

  serialize() {
    console.error('Model should be inherited from and never instantiated directly');
  }

  save() {
    console.error('Model should be inherited from and never instantiated directly');
  }

  static validateRequiredParams(params, required, className) {
    let keys = Object.keys(params);
    _.forEach(required, param => {
      if (!_.includes(keys, param)) {
        throw `Missing required parameter: ${param} while creating an instance of class: ${className}`;
      }
    });
  }
}

export default Model;
