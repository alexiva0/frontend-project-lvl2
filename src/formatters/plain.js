import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const formatPlain = (diffAST) => {
  const mapDiffNode = (diffNode, path = '') => {
    const { key, value, type } = diffNode;
    const currPath = path === '' ? key : `${path}.${key}`;

    switch (type) {
      case 'unchanged':
        return null;
      case 'nested':
        return diffNode.children.map((childDiffNode) => mapDiffNode(childDiffNode, currPath));
      case 'added':
        return `Property '${currPath}' was added with value: ${stringify(
          value,
        )}`;
      case 'removed':
        return `Property '${currPath}' was removed`;
      default:
        return `Property '${currPath}' was updated. From ${stringify(
          diffNode.oldValue,
        )} to ${stringify(value)}`;
    }
  };

  return _.flattenDeep(diffAST.map((diffNode) => mapDiffNode(diffNode))).filter((line) => Boolean(line)).join('\n');
};

export default formatPlain;
