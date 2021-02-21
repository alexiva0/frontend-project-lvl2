import genDiff from '../index.js';
import buildGetPath from './utils/getPathFactory.js';
import stylishExpected from '../__fixtures__/expected/stylish.js';
import plainExpected from '../__fixtures__/expected/plain.js';
import jsonExpected from '../__fixtures__/expected/json.js';

const BASE_YML_PATH = '../__fixtures__/yml';

describe('genDiff yml support', () => {
  const getOriginsPath = buildGetPath(import.meta.url, BASE_YML_PATH);
  const pathOne = getOriginsPath('nested1.yml');
  const pathTwo = getOriginsPath('nested2.yml');

  test('Stylish formatter', () => {
    expect(genDiff(pathOne, pathTwo)).toEqual(stylishExpected.nested);
  });

  test('Plain formatter', () => {
    expect(genDiff(pathOne, pathTwo, 'plain')).toEqual(plainExpected.nested);
  });

  test('JSON formatter', () => {
    expect(genDiff(pathOne, pathTwo, 'json')).toEqual(jsonExpected.nested);
  });
});
