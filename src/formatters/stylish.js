import _ from 'lodash';

const makeSpaces = (depth, spaceCount = 1, replacer = '    ') => replacer.repeat(spaceCount * depth);

const stringify = (node, depth) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const entries = Object.entries(node);
  const result = entries.flatMap(([key, value]) => `${makeSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`).join('\n');
  return `{\n${result}\n${makeSpaces(depth)}}`;
};

const stylish = (diffData) => {
  const iter = (node, depth) => {
    const objects = node.flatMap((obj) => {
      const replacers = {
        nested: '    ',
        same: '    ',
        added: '  + ',
        deleted: '  - ',
      };
      switch (obj.type) {
        case 'nested':
          return `${makeSpaces(depth)}${replacers[obj.type]}${obj.name}: ${(iter(obj.children, depth + 1))}`;
        case 'same':
          return `${makeSpaces(depth)}${replacers.same}${obj.name}: ${obj.value}`;
        case 'added':
          return `${makeSpaces(depth)}${replacers.added}${obj.name}: ${stringify(obj.value, depth + 1)}`;
        case 'changed':
          return `${makeSpaces(depth)}${replacers.deleted}${obj.name}: ${stringify(obj.value1, depth + 1)}\n${makeSpaces(depth)}${replacers.added}${obj.name}: ${stringify(obj.value2, depth + 1)}`;
        case 'deleted':
          return `${makeSpaces(depth)}${replacers.deleted}${obj.name}: ${stringify(obj.value, depth + 1)}`;
        default:
          throw Error(`${obj.type} - unknown type`);
      }
    }).join('\n');

    return `{\n${objects}\n${makeSpaces(depth)}}`;
  };
  return `${iter(diffData, 0)}`;
};

export default stylish;
