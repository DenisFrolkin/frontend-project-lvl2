/* eslint-disable no-console */
import _ from 'lodash';
import parser from './parsers.js';
import chooseFormatter from '../formatters/index.js';

const gendiff = (filepath1, filepath2, format) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  const formater = chooseFormatter(format);

  const makeDiff = (obj1, obj2) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    const diff = keys.map((key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const res = {
          name: key,
          type: 'same',
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
      if (_.has(obj2, key) && !_.has(obj1, key)) {
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

  return formater(makeDiff(object1, object2));
};

export default gendiff;
