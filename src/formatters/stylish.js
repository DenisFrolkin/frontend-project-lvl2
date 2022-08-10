import _ from 'lodash';

const stringify = (data, stylishDeep, spaceCount = 1, replacer = '    ') => {
  const iteraction = (node, deeper) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const entries = Object.entries(node);
    const result = entries.flatMap(([key, value]) => `${replacer.repeat(spaceCount * deeper)}${replacer}${key}: ${iteraction(value, deeper + 1)}`).join('\n');
    return `{\n${result}\n${replacer.repeat((deeper) * spaceCount)}}`;
  };
  return iteraction(data, stylishDeep);
};

const stylish = (diffData, spaceCount = 1, replacer = '    ') => {
  const iter = (node, deeper) => {
    const objects = node.flatMap((obj) => {
      const replacers = {
        nested: '    ',
        same: '    ',
        added: '  + ',
        deleted: '  - ',
      };
      if (obj.type === 'nested') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers[obj.type]}${obj.name}: ${(iter(obj.children, deeper + 1))}`;
      }
      if (obj.type === 'same') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.same}${obj.name}: ${obj.value}`;
      }
      if (obj.type === 'added') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value, deeper + 1)}`;
      }
      if (obj.type === 'deleted') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value, deeper + 1)}`;
      }
      if (obj.type === 'changed') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value1, deeper + 1)}\n${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value2, deeper + 1)}`;
      }
      return undefined;
    }).join('\n');

    return `{\n${objects}\n${replacer.repeat(deeper)}}`;
  };
  return `${iter(diffData, 0)}`;
};

export default stylish;
