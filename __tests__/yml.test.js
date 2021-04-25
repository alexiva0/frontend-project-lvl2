import path from 'path';
import genDiff from '../index.js';
import stylishExpected from '../__fixtures__/expected/stylish.js';
import plainExpected from '../__fixtures__/expected/plain.js';
import jsonExpected from '../__fixtures__/expected/json.js';

const BASE_YML_PATH = '__fixtures__/yml';

const expectedValues = {
  stylish: stylishExpected.nested,
  plain: plainExpected.nested,
  json: jsonExpected.nested,
};

describe('genDiff yml support', () => {
  const pathOne = path.join(BASE_YML_PATH, 'nested1.yml');
  const pathTwo = path.join(BASE_YML_PATH, 'nested2.yml');

  test.each(['stylish', 'plain', 'json'])('%s formatter', (format) => {
    expect(genDiff(pathOne, pathTwo, format)).toEqual(expectedValues[format]);
  });
});
