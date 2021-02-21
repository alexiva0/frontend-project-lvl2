import genDiff from '../index.js';
import buildGetPath from './utils/getPathFactory.js';
import stylishExpected from '../__fixtures__/expected/stylish.js';
import plainExpected from '../__fixtures__/expected/plain.js';
import jsonExpected from '../__fixtures__/expected/json.js';

const BASE_JSON_PATH = '../__fixtures__/json';

describe('genDiff json support', () => {
  const getOriginsPath = buildGetPath(import.meta.url, BASE_JSON_PATH);

  describe('Stylish formatter', () => {
    test('Empty files', () => {
      const path = getOriginsPath('empty.json');

      expect(genDiff(path, path)).toEqual(stylishExpected.empty);
    });

    test('Similar files', () => {
      const path = getOriginsPath('similar.json');
      expect(genDiff(path, path)).toEqual(stylishExpected.similar);
    });

    test('Shallow diff', () => {
      const pathOne = getOriginsPath('shallowDiff1.json');
      const pathTwo = getOriginsPath('shallowDiff2.json');
      expect(genDiff(pathOne, pathTwo)).toEqual(stylishExpected.shallow);
    });

    test('Nested data', () => {
      const pathOne = getOriginsPath('nested1.json');
      const pathTwo = getOriginsPath('nested2.json');
      expect(genDiff(pathOne, pathTwo)).toEqual(stylishExpected.nested);
    });
  });

  describe('Plain formatter', () => {
    test('Empty files', () => {
      const path = getOriginsPath('empty.json');
      expect(genDiff(path, path, 'plain')).toEqual(plainExpected.empty);
    });

    test('Similar files', () => {
      const path = getOriginsPath('similar.json');
      expect(genDiff(path, path, 'plain')).toEqual(plainExpected.similar);
    });

    test('Shallow diff', () => {
      const pathOne = getOriginsPath('shallowDiff1.json');
      const pathTwo = getOriginsPath('shallowDiff2.json');
      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual(plainExpected.shallow);
    });

    test('Nested data', () => {
      const pathOne = getOriginsPath('nested1.json');
      const pathTwo = getOriginsPath('nested2.json');
      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual(plainExpected.nested);
    });
  });

  describe('JSON formatter', () => {
    test('Empty files', () => {
      const path = getOriginsPath('empty.json');
      expect(genDiff(path, path, 'json')).toEqual(jsonExpected.empty);
    });

    test('Similar files', () => {
      const path = getOriginsPath('similar.json');
      expect(genDiff(path, path, 'json')).toEqual(jsonExpected.similar);
    });

    test('Shallow diff', () => {
      const pathOne = getOriginsPath('shallowDiff1.json');
      const pathTwo = getOriginsPath('shallowDiff2.json');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(jsonExpected.shallow);
    });

    test('Nested data', () => {
      const pathOne = getOriginsPath('nested1.json');
      const pathTwo = getOriginsPath('nested2.json');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(jsonExpected.nested);
    });
  });
});
