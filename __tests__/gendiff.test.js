import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const experiment = (filename) => path.resolve(process.cwd(), '__tests__', '__fixtures__', filename);

console.log(__filename);
console.log(__dirname);
console.log(process.cwd());
console.log(path.resolve(process.cwd(), '__tests__', '__fixtures__', 'file1.json'));
console.log(getFixturePath('file1.json'));

const correctstylish = readFileSync(getFixturePath('correctNested.yaml'), 'utf8');
const correctplain = readFileSync(getFixturePath('correctPlain.yaml'), 'utf8');

test('gendiff stylish', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), stylish)).toEqual(correctstylish);
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), stylish)).toEqual(correctstylish);
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), stylish)).toEqual(correctstylish);
});

test('gendiff plain', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), plain)).toEqual(correctplain);
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), plain)).toEqual(correctplain);
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), plain)).toEqual(correctplain);
});

test('stringType', () => {
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), stylish)).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), stylish)).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), stylish)).toEqual('string');
});
