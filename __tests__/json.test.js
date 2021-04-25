import path from 'path';
import genDiff from '../index.js';
import stylishExpected from '../__fixtures__/expected/stylish.js';
import plainExpected from '../__fixtures__/expected/plain.js';
import jsonExpected from '../__fixtures__/expected/json.js';

const BASE_JSON_PATH = '__fixtures__/json';

describe('genDiff json support', () => {
  describe.each([
    ['stylish', stylishExpected],
    ['plain', plainExpected],
    ['json', jsonExpected],
  ])('%s formatter', (format, expectedValues) => {
    test.each([
      ['Empty files', 'empty.json', 'empty.json', expectedValues.empty],
      ['Similar files', 'similar.json', 'similar.json', expectedValues.similar],
      ['Shallow diff', 'shallowDiff1.json', 'shallowDiff2.json', expectedValues.shallow],
      ['Nested data', 'nested1.json', 'nested2.json', expectedValues.nested],
    ])('%s', (_, fileOne, fileTwo, expectedValue) => {
      const pathOne = path.join(BASE_JSON_PATH, fileOne);
      const pathTwo = path.join(BASE_JSON_PATH, fileTwo);
      expect(genDiff(pathOne, pathTwo, format)).toEqual(expectedValue);
    });
  });
});
