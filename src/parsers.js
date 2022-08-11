import yaml from 'js-yaml';

const parser = (data, ext) => {
  if (ext === '.json') {
    return JSON.parse(data);
  } if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  } return undefined;
};

export default parser;
