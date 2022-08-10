import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatter = (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'json') {
    return json;
  }
  if (format === 'stylish') {
    return stylish;
  }
  return undefined;
};

export default chooseFormatter;
