import genDiff from '../src/genDiff.js';
import buildGetPath from './utils/getPathFactory.js';

const BASE_JSON_PATH = '../__fixtures__/json';
const BASE_YML_PATH = '../__fixtures__/yml';

describe('genDiff', () => {
  test('Throw error on incompatible extention', () => {
    const getPath = buildGetPath(import.meta.url, '../__fixtures__');
    const filePath = getPath('incompatible.html');

    const invokeErrorCall = () => genDiff(filePath, filePath);

    expect(invokeErrorCall).toThrow(
      'Comparison of \'.html\' files is not supported.',
    );
  });

  describe('Works well with json files', () => {
    const getPath = buildGetPath(import.meta.url, BASE_JSON_PATH);

    test('Empty files', () => {
      const pathOne = getPath('empty1.json');
      const pathTwo = getPath('empty1.json');

      expect(genDiff(pathOne, pathTwo)).toEqual('{}');
    });

    test('Similar files', () => {
      const pathOne = getPath('similar1.json');
      const pathTwo = getPath('similar2.json');

      const expectedValue = [
        '{',
        '    follow: false',
        '    host: hexlet.io',
        '    proxy: 123.234.53.22',
        '    timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Added data', () => {
      const pathOne = getPath('onlyAdded1.json');
      const pathTwo = getPath('onlyAdded2.json');

      const expectedValue = [
        '{',
        '  + follow: false',
        '    host: hexlet.io',
        '  + proxy: 123.234.53.22',
        '  + timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Deleted data', () => {
      const pathOne = getPath('onlyDeleted1.json');
      const pathTwo = getPath('onlyDeleted2.json');

      const expectedValue = [
        '{',
        '  - follow: false',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  - timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Changed data', () => {
      const pathOne = getPath('onlyChanged1.json');
      const pathTwo = getPath('onlyChanged2.json');

      const expectedValue = [
        '{',
        '  - follow: false',
        '  + follow: true',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  + proxy: 321.434.53.22',
        '  - timeout: 50',
        '  + timeout: 13',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Complex changes', () => {
      const pathOne = getPath('complexDiff1.json');
      const pathTwo = getPath('complexDiff2.json');

      const expectedValue = [
        '{',
        '  - follow: false',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  - timeout: 50',
        '  + timeout: 20',
        '  + verbose: true',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });
  });

  describe('Works well with yml files', () => {
    const getPath = buildGetPath(import.meta.url, BASE_YML_PATH);

    test('Empty files', () => {
      const pathOne = getPath('empty1.yml');
      const pathTwo = getPath('empty1.yml');

      expect(genDiff(pathOne, pathTwo)).toEqual('{}');
    });

    test('Similar files', () => {
      const pathOne = getPath('similar1.yml');
      const pathTwo = getPath('similar2.yml');

      const expectedValue = [
        '{',
        '    follow: false',
        '    host: hexlet.io',
        '    proxy: 123.234.53.22',
        '    timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Added data', () => {
      const pathOne = getPath('onlyAdded1.yml');
      const pathTwo = getPath('onlyAdded2.yml');

      const expectedValue = [
        '{',
        '  + follow: false',
        '    host: hexlet.io',
        '  + proxy: 123.234.53.22',
        '  + timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Deleted data', () => {
      const pathOne = getPath('onlyDeleted1.yml');
      const pathTwo = getPath('onlyDeleted2.yml');

      const expectedValue = [
        '{',
        '  - follow: false',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  - timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Changed data', () => {
      const pathOne = getPath('onlyChanged1.yml');
      const pathTwo = getPath('onlyChanged2.yml');

      const expectedValue = [
        '{',
        '  - follow: false',
        '  + follow: true',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  + proxy: 321.434.53.22',
        '  - timeout: 50',
        '  + timeout: 13',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });

    test('Complex changes', () => {
      const pathOne = getPath('complexDiff1.yml');
      const pathTwo = getPath('complexDiff2.yml');

      const expectedValue = [
        '{',
        '  - follow: false',
        '    host: hexlet.io',
        '  - proxy: 123.234.53.22',
        '  - timeout: 50',
        '  + timeout: 20',
        '  + verbose: true',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });
  });
});
