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

  deserialize(obj) {
    console.error('Model should be inherited from and never instantiated directly');
  }

  save() {
    console.error('Model should be inherited from and never instantiated directly');
  }

  static validateRequiredParams(params, required, className) {
    let result = {result: true, missing: []}
    let keys = Object.keys(params);
    _.forEach(required, param => {
      if (!_.includes(keys, param)) {
        result.missing.push(param);
      }
    });

    if(result.missing.length > 0) {
      result.result = false;
    }

    return result;
  }

  static validateEnum(value, allowedValues) {
    return _.includes(allowedValues, value);
  }
}

export default Model;
