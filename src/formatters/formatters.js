import formatStylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return formatStylish;
  }

  throw new Error(`Format ${format} is not supported.`);
};

export default getFormatter;
