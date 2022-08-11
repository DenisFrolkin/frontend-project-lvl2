/* eslint-disable no-console */
import parser from './parsers.js';
import chooseFormatter from './formatters/index.js';
import makeDiff from './makeDiff.js';
import getData from './reader.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = parser(getData(filepath1).data, getData(filepath1).ext);
  const object2 = parser(getData(filepath2).data, getData(filepath2).ext);

  return chooseFormatter(format)(makeDiff(object1, object2));
};

export default gendiff;
