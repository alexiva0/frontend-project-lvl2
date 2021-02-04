import { isObject, isString } from 'lodash-es';

const getValueString = (value) => {
  if (isObject(value)) return '[complex value]';
  return isString(value) ? `'${value}'` : value;
};

const getLinePostfix = (diff) => {
  switch (diff.type) {
    case 'added':
      return ` with value: ${getValueString(diff.value)}`;
    case 'removed':
      return '';
    default:
      return `. From ${getValueString(diff.oldValue)} to ${getValueString(diff.value)}`;
  }
};

const getPlainLine = (diff, path) => `Property '${path}' was ${diff.type}${getLinePostfix(diff)}`;

const formatPlain = (diffData) => {
  const iter = (data, path = '') => {
    const keys = Object.keys(data);

    return keys
      .filter((key) => data[key].type !== 'unchanged')
      .sort()
      .map((key) => {
        const diff = data[key];
        const fullPath = path === '' ? key : `${path}.${key}`;

        if (diff.type === 'nested') {
          return iter(diff.value, fullPath);
        }

        return getPlainLine(diff, fullPath);
      }).join('\n');
  };

  return iter(diffData);
};

export default formatPlain;
