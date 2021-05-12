import _ from 'lodash';

const getValueString = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const formatPlain = (diffAST) => {
  const stringify = (diffNode, path = '') => {
    const { key, value, type } = diffNode;
    const currPath = path === '' ? key : `${path}.${key}`;

    switch (type) {
      case 'unchanged':
        return null;
      case 'nested':
        return diffNode.children.map((childDiffNode) => stringify(childDiffNode, currPath));
      case 'added':
        return `Property '${currPath}' was added with value: ${getValueString(
          value,
        )}`;
      case 'removed':
        return `Property '${currPath}' was removed`;
      default:
        return `Property '${currPath}' was updated. From ${getValueString(
          diffNode.oldValue,
        )} to ${getValueString(value)}`;
    }
  };

  return _.flattenDeep(diffAST.map((diffNode) => stringify(diffNode))).filter((line) => Boolean(line)).join('\n');
};

export default formatPlain;
