import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const FORMATTERS = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const getFormatter = (format) => {
  if (!(format in FORMATTERS)) {
    throw new Error(`Format ${format} is not supported.`);
  }

  return FORMATTERS[format];
};

export default getFormatter;
