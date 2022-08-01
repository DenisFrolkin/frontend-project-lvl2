import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const experiment = (filename) => path.resolve(process.cwd(), '__tests__', '__fixtures__', filename);

const correctResult = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: "value",
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

test('parse', () => {
  expect(parser(readFileSync(getFixturePath('file1.json')), '.json')).toEqual(correctResult);
  expect(parser(readFileSync(getFixturePath('file1.yaml')), '.yaml')).toEqual(correctResult);
});

test('ObjectType', () => {
  expect(typeof parser(readFileSync(getFixturePath('file1.json')), '.json')).toEqual('object');
  expect(typeof parser(readFileSync(getFixturePath('file1.yaml')), '.yaml')).toEqual('object');
  expect(typeof parser(readFileSync(getFixturePath('correctfile.txt')), '.txt')).toEqual('undefined');
});
