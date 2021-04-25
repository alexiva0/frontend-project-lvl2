import _ from 'lodash';

const INDENT_CHAR = ' ';
const ADDED_LINE_PREFIX = '+';
const DELETED_LINE_PREFIX = '-';
const LINE_BREAK = '\n';

const getObjectString = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indent = INDENT_CHAR.repeat(4);
  const dataIndent = indent.repeat(depth);
  const bracketsIndent = indent.repeat(depth - 1);
  const lines = Object.entries(data).map(([key, value]) => `${dataIndent}${key}: ${getObjectString(value, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketsIndent}}`,
  ].join(LINE_BREAK);
};

const getStylishLine = (indent, prefix, key, value) => `${indent}${prefix} ${key}: ${value}`;

const getValueString = (value, depth) => (_.isObject(value)
  ? getObjectString(value, depth + 1)
  : value);

const formatStylish = (diffAST) => {
  const getStylishOutput = (ast, depth) => {
    const indent = (INDENT_CHAR.repeat(4 * depth - 2));
    const bracketsIndent = (INDENT_CHAR.repeat(4 * (depth - 1)));

    const lines = ast.flatMap(({
      key, type, value, children, oldValue,
    }) => {
      if (children) {
        return getStylishLine(indent, INDENT_CHAR, key, getStylishOutput(children, depth + 1));
      }

      switch (type) {
        case 'added':
          return getStylishLine(indent, ADDED_LINE_PREFIX, key, getValueString(value, depth));
        case 'removed':
          return getStylishLine(indent, DELETED_LINE_PREFIX, key, getValueString(value, depth));
        case 'updated':
          return [
            getStylishLine(indent, DELETED_LINE_PREFIX, key, getValueString(oldValue, depth)),
            getStylishLine(indent, ADDED_LINE_PREFIX, key, getValueString(value, depth)),
          ];
        default:
          return getStylishLine(indent, INDENT_CHAR, key, getValueString(value, depth));
      }
    });

    const separator = lines.length === 0 ? '' : LINE_BREAK;

    return [
      '{',
      ...lines,
      `${bracketsIndent}}`,
    ].join(separator);
  };

  return getStylishOutput(diffAST, 1);
};

export default formatStylish;
