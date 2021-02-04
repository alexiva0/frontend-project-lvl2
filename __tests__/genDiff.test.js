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

  test('Throw error on incompatible format', () => {
    const getPath = buildGetPath(import.meta.url, '../__fixtures__/json');
    const filePath = getPath('empty1.json');

    const invokeErrorCall = () => genDiff(filePath, filePath, { format: 'colourful' });

    expect(invokeErrorCall).toThrow(
      'Format colourful is not supported.',
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

    test('Nested data', () => {
      const pathOne = getPath('nested1.json');
      const pathTwo = getPath('nested2.json');

      const expectedValue = [
        '{',
        '    common: {',
        '      + follow: false',
        '        setting1: Value 1',
        '      - setting2: 200',
        '      - setting3: true',
        '      + setting3: null',
        '      + setting4: blah blah',
        '      + setting5: {',
        '            key5: value5',
        '        }',
        '        setting6: {',
        '            doge: {',
        '              - wow: ',
        '              + wow: so much',
        '            }',
        '            key: value',
        '          + ops: vops',
        '        }',
        '    }',
        '    group1: {',
        '      - baz: bas',
        '      + baz: bars',
        '        foo: bar',
        '      - nest: {',
        '            key: value',
        '        }',
        '      + nest: str',
        '    }',
        '  - group2: {',
        '        abc: 12345',
        '        deep: {',
        '            id: 45',
        '        }',
        '    }',
        '  + group3: {',
        '        fee: 100500',
        '        deep: {',
        '            id: {',
        '                number: 45',
        '            }',
        '        }',
        '    }',
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

    test('Nested data', () => {
      const pathOne = getPath('nested1.yml');
      const pathTwo = getPath('nested2.yml');

      const expectedValue = [
        '{',
        '    common: {',
        '      + follow: false',
        '        setting1: Value 1',
        '      - setting2: 200',
        '      - setting3: true',
        '      + setting3: null',
        '      + setting4: blah blah',
        '      + setting5: {',
        '            key5: value5',
        '        }',
        '        setting6: {',
        '            doge: {',
        '              - wow: ',
        '              + wow: so much',
        '            }',
        '            key: value',
        '          + ops: vops',
        '        }',
        '    }',
        '    group1: {',
        '      - baz: bas',
        '      + baz: bars',
        '        foo: bar',
        '      - nest: {',
        '            key: value',
        '        }',
        '      + nest: str',
        '    }',
        '  - group2: {',
        '        abc: 12345',
        '        deep: {',
        '            id: 45',
        '        }',
        '    }',
        '  + group3: {',
        '        fee: 100500',
        '        deep: {',
        '            id: {',
        '                number: 45',
        '            }',
        '        }',
        '    }',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo)).toEqual(expectedValue);
    });
  });
});
