import _ from 'lodash';

const INDENT_CHAR = ' ';
const ADDED_LINE_PREFIX = '+';
const DELETED_LINE_PREFIX = '-';
const LINE_BREAK = '\n';

const stringifyObject = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indent = INDENT_CHAR.repeat(4);
  const dataIndent = indent.repeat(depth);
  const bracketsIndent = indent.repeat(depth - 1);
  const lines = Object.entries(data).map(
    ([key, value]) => `${dataIndent}${key}: ${stringifyObject(value, depth + 1)}`,
  );

  return ['{', ...lines, `${bracketsIndent}}`].join(LINE_BREAK);
};

const stringifyValue = (value, depth) => (_.isObject(value) ? stringifyObject(value, depth + 1) : value);

const stringify = (indent, prefix, key, value, depth) => `${indent}${prefix} ${key}: ${stringifyValue(value, depth)}`;

const formatStylish = (diffAST, currKey = '', depth = 1) => {
  const indent = INDENT_CHAR.repeat(4 * depth - 2);
  const bracketsIndent = INDENT_CHAR.repeat(4 * (depth - 1));
  const firstLine = depth > 1 ? `${bracketsIndent}${currKey}: {` : `${bracketsIndent}{`;

  const mapDiffNode = (diffNode) => {
    const {
      type, key, value, oldValue, children,
    } = diffNode;

    switch (type) {
      case 'nested':
        return formatStylish(children, key, depth + 1);
      case 'added':
        return stringify(indent, ADDED_LINE_PREFIX, key, value, depth);
      case 'removed':
        return stringify(indent, DELETED_LINE_PREFIX, key, value, depth);
      case 'updated':
        return [
          stringify(indent, DELETED_LINE_PREFIX, key, oldValue, depth),
          stringify(indent, ADDED_LINE_PREFIX, key, value, depth),
        ];
      default:
        return stringify(indent, INDENT_CHAR, key, value, depth);
    }
  };

  const lines = diffAST.flatMap((diffNode) => mapDiffNode(diffNode));
  const separator = lines.length === 0 ? '' : '\n';

  return [firstLine, ...lines, `${bracketsIndent}}`].join(separator);
};

export default (diffAST) => formatStylish(diffAST);
