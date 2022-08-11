import _ from 'lodash';

const formatValue = (value) => {
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
      switch (obj.type) {
        case 'nested':
          return `${iter(obj.children, `${acc}${obj.name}.`)}`;
        case 'added':
          return `Property '${acc}${obj.name}' was added with value: ${formatValue(obj.value)}`;
        case 'changed':
          return `Property '${acc + obj.name}' was updated. From ${formatValue(obj.value1)} to ${formatValue(obj.value2)}`;
        case 'deleted':
          return `Property '${acc + obj.name}' was removed`;
        default:
          return undefined;
      }
    });
    return objects.filter((obj) => obj !== undefined).join('\n');
  };
  return iter(diffData, '');
};

export default plain;
