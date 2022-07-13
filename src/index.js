/* eslint-disable no-console */
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parser from './parsers.js';

const ext = (filepath) => path.extname(filepath);
const data = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));

const gendiff = (filepath1, filepath2) => {
  const obj11 = parser(data(filepath1), ext(filepath1));
  const obj22 = parser(data(filepath2), ext(filepath2));

  const makeDiff = (obj1, obj2) => {
    const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

    const newData = keys.map((key) => {
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
    return newData;
  };

  const newDiff = makeDiff(obj11, obj22);

  

  const stylish = (diffData, spaceCount = 1, replacer = '    ') => {
    const stringify = (data, stylishDeep, spaceCount = 1, replacer = '    ') => {
      const iteraction = (node, deeper) => {
        if (!_.isObject(node)) {
          return `${node}`;
        }
        const entries = Object.entries(node);
        const result = entries.flatMap(([key, value]) => `${replacer.repeat(spaceCount * deeper)}${key}: ${iteraction(value, deeper + 1)}`).join('\n');
        return `{\n${result}\n${replacer.repeat((deeper - 1) * spaceCount)}}`;
      };
      return iteraction(data, stylishDeep + 2);
    };
    const iter = (node, deeper) => {
      const objects = node.flatMap((obj) => {
        const replacers = {
          same: '    ',
          added: '  + ',
          deleted: '  - ',
        };
        if (obj.children) {
          return `${replacer.repeat(spaceCount * deeper)}${replacers[obj.type]}${obj.name}: ${(iter(obj.children, deeper + 1))}`;
        }
        if (obj.type === 'same') {
          return `${replacer.repeat(spaceCount * deeper)}${replacers.same}${obj.name}: ${obj.value}`;
        }
        if (obj.type === 'added') {
          return `${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value, deeper)}`;
        }
        if (obj.type === 'deleted') {
          return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value, deeper)}`;
        }
        return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value1, deeper)}\n${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value2, deeper)}`;
      }).join('\n');

      return `{\n${objects}\n${replacer.repeat(deeper)}}`;
    };
    return iter(diffData, 0);
  };

  return stylish(newDiff);
};

export default gendiff;
