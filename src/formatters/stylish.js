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

const getValueString = (rawValue, depth) => (isObject(rawValue)
  ? getObjectString(rawValue, depth + 1)
  : rawValue);

const formatStylish = (diffData) => {
  const iter = (data, depth) => {
    const keys = Object.keys(data).sort();
    const indent = (' '.repeat(4 * depth - 2));
    const bracketsIndent = (' '.repeat(4 * (depth - 1)));

    const lines = keys.flatMap((key) => {
      const diff = data[key];
      const rawValue = diff.value;

      switch (diff.type) {
        case 'added':
          return getStylishLine(indent, '+', key, getValueString(rawValue, depth));
        case 'removed':
          return getStylishLine(indent, '-', key, getValueString(rawValue, depth));
        case 'updated':
          return [
            getStylishLine(indent, '-', key, getValueString(diff.oldValue, depth)),
            getStylishLine(indent, '+', key, getValueString(rawValue, depth)),
          ];
        case 'nested':
          return getStylishLine(indent, ' ', key, iter(rawValue, depth + 1));
        default:
          return getStylishLine(indent, ' ', key, getValueString(rawValue, depth));
      }
    });

    lines.unshift('{');
    lines.push(`${bracketsIndent}}`);

    return lines.length === 2
      ? lines.join('')
      : lines.join('\n');
  };

  return iter(diffData, 1);
};

export default formatStylish;
