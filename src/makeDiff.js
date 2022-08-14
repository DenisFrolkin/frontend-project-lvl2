import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      const res = {
        name: key,
        type: 'added',
        value: obj2[key],
      };
      return res;
    }
    if (!_.has(obj2, key)) {
      const res = {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
      return res;
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const res = {
        name: key,
        type: 'nested',
        children: makeDiff(obj1[key], obj2[key]),
      };
      return res;
    }
    if (obj1[key] === obj2[key]) {
      const res = {
        name: key,
        type: 'same',
        value: obj1[key],
      };
      return res;
    }
    const res = {
      name: key,
      type: 'changed',
      value1: obj1[key],
      value2: obj2[key],
    };
    return res;
  });
  return diff;
};

export default makeDiff;
