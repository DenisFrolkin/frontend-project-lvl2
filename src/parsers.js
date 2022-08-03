import yaml from 'js-yaml';
import getData from './reader.js';

const parser = (filepath) => {
  const ext = getData(filepath)[1];
  const data = getData(filepath)[0];
  if (ext === '.json') {
    return JSON.parse(data);
  } if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  } return undefined;
};

export default parser;
