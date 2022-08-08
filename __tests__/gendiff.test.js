import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const experiment = (filename) => path.resolve(process.cwd(), '__tests__', '__fixtures__', filename);

const correctstylish = readFileSync(getFixturePath('correctStylish.yaml'), 'utf8').trim();
const correctplain = readFileSync(getFixturePath('correctPlain.yaml'), 'utf8').trim();
const correctJSON = readFileSync(getFixturePath('correctJSON.yaml'), 'utf8').trim();

test.each([
  [experiment('file1.json'), getFixturePath('file2.json'), 'stylish', correctstylish],
  [experiment('file1.yaml'), getFixturePath('file2.json'), 'plain', correctplain],
  [experiment('file1.yml'), getFixturePath('file2.yml'), 'json', correctJSON],
])('test.each.test', (a, b, c, expected) => {
  expect(gendiff(a, b, c)).toBe(expected);
});

test('stringType', () => {
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), stylish)).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), plain)).toEqual('string');
  expect(typeof gendiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), json)).toEqual('string');
});
