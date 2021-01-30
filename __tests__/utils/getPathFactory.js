import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const buildGetPath = (testFileUrl, basePath) => {
  const __filename = fileURLToPath(testFileUrl);
  const __dirname = dirname(__filename);

  return (filename) => path.join(__dirname, basePath, filename);
};

export default buildGetPath;
