import yaml from 'js-yaml';

const parser = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw Error(`${ext} - unknown type of file`);
  }
};

export default parser;
