import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

console.log(__dirname);
console.log(getFixturePath('file1.json'));
console.log(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.json')));

const correctResult = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('gendiff', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(correctResult);
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(correctResult);
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(correctResult);
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(correctResult);
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'))).toEqual(correctResult);
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'))).toEqual(correctResult);
});

test('stringType', () => {
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'))).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'))).toEqual('string');
});
