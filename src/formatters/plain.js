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

const formatPlain = (diffAST) => {
  const iter = (data, path = '') => {
    const nodesToPrint = data.filter(({ type }) => type !== 'unchanged');

    return nodesToPrint.map((diffNode) => {
      const fullPath = path === '' ? diffNode.key : `${path}.${diffNode.key}`;

      if (diffNode.type === 'nested') {
        return iter(diffNode.children, fullPath);
      }

      return getPlainLine(diffNode, fullPath);
    }).join('\n');
  };

  return iter(diffAST);
};

export default formatPlain;
