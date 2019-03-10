import _ from 'lodash';

export const serializeAll = collection => {
  return _.map(collection, item => item.serialize());
};
