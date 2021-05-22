import fs from 'fs';
import path from 'path';

import parseContent from './parse-content.js';

const getFileContent = (rawPath) => {
  const fileExt = path.extname(rawPath);
  const absolutePath = path.resolve(process.cwd(), rawPath);
  const fileRawContent = fs.readFileSync(absolutePath, 'utf8');
  return parseContent(fileRawContent, fileExt);
};

export default getFileContent;
