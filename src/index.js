/* eslint-disable no-console */
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const ext = (filepath) => path.extname(filepath);
const data = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));

const gendiff = (filepath1, filepath2) => {
  const data1 = data(filepath1);
  const data2 = data(filepath2);

  const ext1 = ext(filepath1);
  const ext2 = ext(filepath2);

  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);

  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const newData = keys.map((key) => {
    const res = {};
    if (obj1[key] && obj2[key]) {
      res.newKey = key;
      res.value1 = obj1[key];
      res.value2 = obj2[key];
      return res;
    } if (!obj2[key]) {
      res.newKey = key;
      res.value1 = obj1[key];
      return res;
    } res.newKey = key;
    res.value2 = obj2[key];
    return res;
  });

  let diff = '{';
  for (const obj of newData) {
    if (obj.value1 === obj.value2) {
      diff = `${diff}\n   ${obj.newKey}: ${obj.value1}`;
    } else if (obj.value1 && obj.value2) {
      diff = `${diff}\n - ${obj.newKey}: ${obj.value1}\n + ${obj.newKey}: ${obj.value2}`;
    } else if (!obj.value2) {
      diff = `${diff}\n - ${obj.newKey}: ${obj.value1}`;
    } else {
      diff = `${diff}\n + ${obj.newKey}: ${obj.value2}`;
    }
  }
  diff = `${diff}\n}`;
  return diff;
};

export default gendiff;
