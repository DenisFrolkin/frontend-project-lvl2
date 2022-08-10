import _ from 'lodash';

const makeQuotation = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diffData) => {
  const iter = (node, acc) => {
    const objects = node.flatMap((obj) => {
      if (obj.type === 'nested') {
        return `${iter(obj.children, `${acc}${obj.name}.`)}`;
      }
      if (obj.type === 'added') {
        return `Property '${acc}${obj.name}' was added with value: ${makeQuotation(obj.value)}`;
      }
      if (obj.type === 'changed') {
        return `Property '${acc + obj.name}' was updated. From ${makeQuotation(obj.value1)} to ${makeQuotation(obj.value2)}`;
      }
      if (obj.type === 'deleted') {
        return `Property '${acc + obj.name}' was removed`;
      }
      return undefined;
    });
    return objects.filter((obj) => obj !== undefined).join('\n');
  };
  return iter(diffData, '');
};

export default plain;
