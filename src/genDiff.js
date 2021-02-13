import fs from 'fs';
import path from 'path';
import { uniq, isObject, sortBy } from 'lodash-es';

import getContentParser from './contentParsers.js';
import getFormatter from './formatters/index.js';

const getFileContent = (rawPath) => {
  const parseContent = getContentParser(rawPath);
  const absolutePath = path.resolve(process.cwd(), rawPath);
  const fileRawContent = fs.readFileSync(absolutePath, 'utf8');
  return parseContent(fileRawContent);
};

const getDiffData = (dataOne, dataTwo) => {
  const keys = sortBy(uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ]));

  return keys.reduce((acc, key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];

    switch (true) {
      case (valueOne === undefined):
        return [
          ...acc,
          {
            key,
            type: 'added',
            value: valueTwo,
          },
        ];

      case (valueTwo === undefined):
        return [
          ...acc,
          {
            key,
            type: 'removed',
            value: valueOne,
          },
        ];

      case (isObject(valueOne) && isObject(valueTwo)):
        return [
          ...acc,
          {
            key,
            type: 'nested',
            children: getDiffData(valueOne, valueTwo),
          },
        ];

      case (valueOne !== valueTwo):
        return [
          ...acc,
          {
            key,
            type: 'updated',
            oldValue: valueOne,
            value: valueTwo,
          },
        ];

      default:
        return [
          ...acc,
          {
            key,
            type: 'unchanged',
            value: valueOne,
          },
        ];
    }
  }, []);
};

const genDiff = (pathOne, pathTwo, format = 'stylish') => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diff = getDiffData(fileOneContent, fileTwoContent);

  const formatter = getFormatter(format);

  return formatter(diff);
};

export default genDiff;
