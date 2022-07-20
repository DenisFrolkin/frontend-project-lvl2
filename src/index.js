/* eslint-disable no-console */
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parser from './parsers.js';

const ext = (filepath) => path.extname(filepath);
const data = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));

const gendiff = (filepath1, filepath2, formater) => {
  const object1 = parser(data(filepath1), ext(filepath1));
  const object2 = parser(data(filepath2), ext(filepath2));

  const makeDiff = (obj1, obj2) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    const diff = keys.map((key) => {
      const res = {};
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        res.name = key;
        res.type = 'same';
        res.children = makeDiff(obj1[key], obj2[key]);
        return res;
      }
      if (obj1[key] === obj2[key]) {
        res.name = key;
        res.type = 'same';
        res.value = obj1[key];
        return res;
      }
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        res.name = key;
        res.type = 'changed';
        res.value1 = obj1[key];
        res.value2 = obj2[key];
        return res;
      }
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        res.name = key;
        res.type = 'added';
        res.value = obj2[key];
        return res;
      }
      res.name = key;
      res.type = 'deleted';
      res.value = obj1[key];
      return res;
    });
    return diff;
  };

  return formater(makeDiff(object1, object2));
};

export default gendiff;
