/* eslint-disable no-console */
import parser from './parsers.js';
import chooseFormatter from './formatters/index.js';
import makeDiff from './makeDiff.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);

  return chooseFormatter(format)(makeDiff(object1, object2));
};

export default gendiff;
