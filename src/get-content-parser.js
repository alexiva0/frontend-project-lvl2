import path from 'path';
import YAML from 'yaml';

const getContentParser = (filePath) => {
  const ext = path.extname(filePath);

  if (ext === '.json') {
    return JSON.parse;
  }

  if (ext === '.yml') {
    return YAML.parse;
  }

  throw new Error(`Comparison of '${ext}' files is not supported.`);
};

export default getContentParser;
