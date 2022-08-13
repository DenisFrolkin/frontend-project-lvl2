import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    default:
      throw Error(console.log(`${format} - unknown format name`));
  }
};

export default chooseFormatter;
