import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const experiment = (filename) => path.resolve(process.cwd(), '__tests__', '__fixtures__', filename);

const correctResult = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};

console.log(typeof parser(readFileSync(getFixturePath('file1.json')), '.json'));

test('parse', () => {
  expect(parser(readFileSync(getFixturePath('file1.json')), '.json')).toEqual(correctResult);
  expect(parser(readFileSync(getFixturePath('file1.yml')), '.yml')).toEqual(correctResult);
  expect(parser(readFileSync(getFixturePath('file1.yaml')), '.yaml')).toEqual(correctResult);
});

test('ObjectType', () => {
  expect(typeof parser(readFileSync(getFixturePath('file1.json')), '.json')).toEqual('object');
  expect(typeof parser(readFileSync(getFixturePath('file1.yml')), '.yml')).toEqual('object');
  expect(typeof parser(readFileSync(getFixturePath('file1.yaml')), '.yaml')).toEqual('object');
  expect(typeof parser(readFileSync(getFixturePath('correctfile.txt')), '.txt')).toEqual('undefined');
});
