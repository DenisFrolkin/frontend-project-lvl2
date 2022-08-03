import path from 'path';
import { readFileSync } from 'fs';

const getData = (filepath) => {
  const ext = path.extname(filepath);
  const data = readFileSync(path.resolve(process.cwd(), filepath));
  return [data, ext];
};

export default getData;
