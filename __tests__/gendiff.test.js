import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const correctResult = 
`{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`   

test('gendiff', () => {
  expect(typeof gendiff('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file1.json')).toEqual('string');
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(correctResult);
});
