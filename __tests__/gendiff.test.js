import gendiff from '../src/index.js';

test('gendiff', () => {
  expect(typeof gendiff('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file1.json')).toEqual('string');
});
