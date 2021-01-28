import fs from 'fs';
import path from 'path';
import { uniq } from 'lodash-es';

const getFileContent = (rawPath) => {
  const absolutePath = path.resolve(process.cwd(), rawPath);
  const fileRawContent = fs.readFileSync(absolutePath);
  return JSON.parse(fileRawContent);
};

const getDiffData = (dataOne, dataTwo) => {
  const keys = uniq([
    ...Object.keys(dataOne),
    ...Object.keys(dataTwo),
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
        type: 'deleted',
        value: valueOne,
      };
    } else if (valueOne !== valueTwo) {
      acc[key] = {
        type: 'changed',
        oldValue: valueOne,
        newValue: valueTwo,
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

const getLineString = (key, value, prefix = ' ') => `  ${prefix} ${key}: ${value}`;

const getDiffString = (diffData) => {
  const keys = Object.keys(diffData).sort();

  const diffStringFragments = keys.reduce((acc, key) => {
    const diff = diffData[key];

    switch (diff.type) {
      case 'added':
        acc.push(getLineString(key, diff.value, '+'));
        break;
      case 'deleted':
        acc.push(getLineString(key, diff.value, '-'));
        break;
      case 'changed':
        acc.push(getLineString(key, diff.oldValue, '-'));
        acc.push(getLineString(key, diff.newValue, '+'));
        break;
      default:
        acc.push(getLineString(key, diff.value));
        break;
    }

    return acc;
  }, ['{']);

  diffStringFragments.push('}');

  return diffStringFragments.join('\n');
};

const genDiff = (pathOne, pathTwo) => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diff = getDiffData(fileOneContent, fileTwoContent);

  return getDiffString(diff);
};

export default genDiff;
