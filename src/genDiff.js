import fs from 'fs';
import path from 'path';
import { uniq, isObject } from 'lodash-es';

import getContentParser from './contentParsers.js';
import getFormatter from './formatters/index.js';

const getFileContent = (rawPath) => {
  const parseContent = getContentParser(rawPath);
  const absolutePath = path.resolve(process.cwd(), rawPath);
  const fileRawContent = fs.readFileSync(absolutePath, 'utf8');
  return parseContent(fileRawContent);
};

const getDiffData = (dataOne, dataTwo) => {
  const keys = uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ])
    .sort();
  return keys.reduce((acc, key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];

    if (valueOne === undefined) {
      acc[key] = {
        type: 'added',
        value: valueTwo,
      };
    } else if (valueTwo === undefined) {
      acc[key] = {
        type: 'removed',
        value: valueOne,
      };
    } else if (isObject(valueOne) && isObject(valueTwo)) {
      acc[key] = {
        type: 'nested',
        value: getDiffData(valueOne, valueTwo),
      };
    } else if (valueOne !== valueTwo) {
      acc[key] = {
        type: 'updated',
        oldValue: valueOne,
        value: valueTwo,
      };
    } else {
      acc[key] = {
        type: 'unchanged',
        value: valueOne,
      };
    }

    return acc;
  }, {});
};

const genDiff = (pathOne, pathTwo, format = 'stylish') => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diff = getDiffData(fileOneContent, fileTwoContent);

  const formatter = getFormatter(format);

  return formatter(diff);
};

export default genDiff;
