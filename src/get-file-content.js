import fs from 'fs';
import path from 'path';

import getContentParser from './get-content-parser.js';

const getFileContent = (rawPath) => {
  const fileExt = path.extname(rawPath);
  const parseContent = getContentParser(fileExt);
  const absolutePath = path.resolve(process.cwd(), rawPath);
  const fileRawContent = fs.readFileSync(absolutePath, 'utf8');
  return parseContent(fileRawContent);
};

export default getFileContent;
