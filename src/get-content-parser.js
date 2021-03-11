import YAML from 'yaml';

const JSON_EXTENSION = '.json';
const YAML_EXTENSION = '.yml';

const PARSERS = {
  [JSON_EXTENSION]: JSON.parse,
  [YAML_EXTENSION]: YAML.parse,
};

const getContentParser = (fileExt) => {
  if (!(fileExt in PARSERS)) {
    throw new Error(`Comparison of '${fileExt}' files is not supported.`);
  }

  return PARSERS[fileExt];
};

export default getContentParser;
