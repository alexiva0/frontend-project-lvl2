import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return formatStylish;
  }

  if (format === 'plain') {
    return formatPlain;
  }

  throw new Error(`Format ${format} is not supported.`);
};

export default getFormatter;
