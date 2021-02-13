import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return formatStylish;
  }

  if (format === 'plain') {
    return formatPlain;
  }

  if (format === 'json') {
    return (data) => JSON.stringify(data, null, 4);
  }

  throw new Error(`Format ${format} is not supported.`);
};

export default getFormatter;
