/* eslint-disable no-console */
import _ from 'lodash';
import parser from './parsers.js';
import chooseFormatter from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);

  const makeDiff = (obj1, obj2) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    const diff = keys.map((key) => {
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
      if (_.has(obj1, key) && _.has(obj2, key)) {
        const res = {
          name: key,
          type: 'changed',
          value1: obj1[key],
          value2: obj2[key],
        };
        return res;
      }
      if (_.has(obj2, key)) {
        const res = {
          name: key,
          type: 'added',
          value: obj2[key],
        };
        return res;
      }
      const res = {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
      return res;
    });

    return diff;
  };

  return chooseFormatter(format)(makeDiff(object1, object2));
};

export default gendiff;
