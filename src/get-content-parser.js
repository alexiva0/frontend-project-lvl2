import path from 'path';
import YAML from 'yaml';

const JSON_EXTENSION = '.json';
const YAML_EXTENSION = '.yml';

const PARSERS = {
  [JSON_EXTENSION]: JSON.parse,
  [YAML_EXTENSION]: YAML.parse,
};

const getContentParser = (filePath) => {
  const ext = path.extname(filePath);

  if (!(ext in PARSERS)) {
    throw new Error(`Comparison of '${ext}' files is not supported.`);
  }

  return PARSERS[ext];
};

export default getContentParser;
