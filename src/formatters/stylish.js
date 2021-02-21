import { isObject } from 'lodash-es';

const getObjectString = (data, depth) => {
  if (!isObject(data)) {
    return data;
  }

  const indent = ' '.repeat(4);
  const dataIndent = indent.repeat(depth);
  const bracketsIndent = indent.repeat(depth - 1);
  const lines = Object.entries(data).map(([key, value]) => `${dataIndent}${key}: ${getObjectString(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketsIndent}}`,
  ].join('\n');
};

const getStylishLine = (indent, prefix, key, value) => `${indent}${prefix} ${key}: ${value}`;

const getValueString = (value, depth) => (isObject(value)
  ? getObjectString(value, depth + 1)
  : value);

const formatStylish = (diffAST) => {
  const iter = (ast, depth) => {
    const indent = (' '.repeat(4 * depth - 2));
    const bracketsIndent = (' '.repeat(4 * (depth - 1)));

    const lines = ast.flatMap(({
      key, type, value, children, oldValue,
    }) => {
      if (children) {
        return getStylishLine(indent, ' ', key, iter(children, depth + 1));
      }

      switch (type) {
        case 'added':
          return getStylishLine(indent, '+', key, getValueString(value, depth));
        case 'removed':
          return getStylishLine(indent, '-', key, getValueString(value, depth));
        case 'updated':
          return [
            getStylishLine(indent, '-', key, getValueString(oldValue, depth)),
            getStylishLine(indent, '+', key, getValueString(value, depth)),
          ];
        default:
          return getStylishLine(indent, ' ', key, getValueString(value, depth));
      }
    });

    const separator = lines.length === 0 ? '' : '\n';

    return [
      '{',
      ...lines,
      `${bracketsIndent}}`,
    ].join(separator);
  };

  return iter(diffAST, 1);
};

export default formatStylish;
