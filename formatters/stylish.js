import _ from 'lodash';

const stringify = (data, stylishDeep, spaceCount = 1, replacer = '    ') => {
  const iteraction = (node, deeper) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const entries = Object.entries(node);
    const result = entries.flatMap(([key, value]) => `${replacer.repeat(spaceCount * deeper)}${key}: ${iteraction(value, deeper + 1)}`).join('\n');
    return `{\n${result}\n${replacer.repeat((deeper - 1) * spaceCount)}}`;
  };
  return iteraction(data, stylishDeep + 2);
};

const stylish = (diffData, spaceCount = 1, replacer = '    ') => {
  const iter = (node, deeper) => {
    const objects = node.flatMap((obj) => {
      const replacers = {
        same: '    ',
        added: '  + ',
        deleted: '  - ',
      };
      if (obj.children) {
        return `${replacer.repeat(spaceCount * deeper)}${replacers[obj.type]}${obj.name}: ${(iter(obj.children, deeper + 1))}`;
      }
      if (obj.type === 'same') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.same}${obj.name}: ${obj.value}`;
      }
      if (obj.type === 'added') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value, deeper)}`;
      }
      if (obj.type === 'deleted') {
        return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value, deeper)}`;
      }
      return `${replacer.repeat(spaceCount * deeper)}${replacers.deleted}${obj.name}: ${stringify(obj.value1, deeper)}\n${replacer.repeat(spaceCount * deeper)}${replacers.added}${obj.name}: ${stringify(obj.value2, deeper)}`;
    }).join('\n');

    return `{\n${objects}\n${replacer.repeat(deeper)}}`;
  };
  return `${iter(diffData, 0)}\n`;
};

export default stylish;
