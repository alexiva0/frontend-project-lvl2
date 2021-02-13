import genDiff from '../src/genDiff.js';
import buildGetPath from './utils/getPathFactory.js';

const BASE_JSON_PATH = '../__fixtures__/json';

describe('genDiff json support', () => {
  const getPath = buildGetPath(import.meta.url, BASE_JSON_PATH);

  describe('Stylish formatter', () => {
    test('Empty files', () => {
      const path = getPath('empty.json');

      expect(genDiff(path, path)).toEqual('{}');
    });

    test('Similar files', () => {
      const path = getPath('similar.json');

      const expectedValue = [
        '{',
        '    follow: false',
        '    host: hexlet.io',
        '    proxy: 123.234.53.22',
        '    timeout: 50',
        '}',
      ].join('\n');
      expect(genDiff(path, path)).toEqual(expectedValue);
    });

    test('Complex changes', () => {
      const pathOne = getPath('shallowDiff1.json');
      const pathTwo = getPath('shallowDiff2.json');

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

  describe('Plain formatter', () => {
    test('Empty files', () => {
      const path = getPath('empty.json');

      expect(genDiff(path, path, 'plain')).toEqual('');
    });

    test('Similar files', () => {
      const path = getPath('similar.json');

      expect(genDiff(path, path, 'plain')).toEqual('');
    });

    test('Complex changes', () => {
      const pathOne = getPath('shallowDiff1.json');
      const pathTwo = getPath('shallowDiff2.json');

      const expectedValue = [
        "Property 'follow' was removed",
        "Property 'proxy' was removed",
        "Property 'timeout' was updated. From 50 to 20",
        "Property 'verbose' was added with value: true",
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual(expectedValue);
    });

    test('Nested data', () => {
      const pathOne = getPath('nested1.json');
      const pathTwo = getPath('nested2.json');

      const expectedValue = [
        "Property 'common.follow' was added with value: false",
        "Property 'common.setting2' was removed",
        "Property 'common.setting3' was updated. From true to null",
        "Property 'common.setting4' was added with value: 'blah blah'",
        "Property 'common.setting5' was added with value: [complex value]",
        "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
        "Property 'common.setting6.ops' was added with value: 'vops'",
        "Property 'group1.baz' was updated. From 'bas' to 'bars'",
        "Property 'group1.nest' was updated. From [complex value] to 'str'",
        "Property 'group2' was removed",
        "Property 'group3' was added with value: [complex value]",
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual(expectedValue);
    });
  });

  describe('JSON formatter', () => {
    test('Empty files', () => {
      const path = getPath('empty.json');

      expect(genDiff(path, path, 'json')).toEqual('[]');
    });

    test('Similar files', () => {
      const path = getPath('similar.json');

      const expectedValue = [
        '[',
        '    {',
        '        "key": "follow",',
        '        "type": "unchanged",',
        '        "value": false',
        '    },',
        '    {',
        '        "key": "host",',
        '        "type": "unchanged",',
        '        "value": "hexlet.io"',
        '    },',
        '    {',
        '        "key": "proxy",',
        '        "type": "unchanged",',
        '        "value": "123.234.53.22"',
        '    },',
        '    {',
        '        "key": "timeout",',
        '        "type": "unchanged",',
        '        "value": 50',
        '    }',
        ']',
      ].join('\n');
      expect(genDiff(path, path, 'json')).toEqual(expectedValue);
    });

    test('Complex changes', () => {
      const pathOne = getPath('shallowDiff1.json');
      const pathTwo = getPath('shallowDiff2.json');

      const expectedValue = [
        '[',
        '    {',
        '        "key": "follow",',
        '        "type": "removed",',
        '        "value": false',
        '    },',
        '    {',
        '        "key": "host",',
        '        "type": "unchanged",',
        '        "value": "hexlet.io"',
        '    },',
        '    {',
        '        "key": "proxy",',
        '        "type": "removed",',
        '        "value": "123.234.53.22"',
        '    },',
        '    {',
        '        "key": "timeout",',
        '        "type": "updated",',
        '        "oldValue": 50,',
        '        "value": 20',
        '    },',
        '    {',
        '        "key": "verbose",',
        '        "type": "added",',
        '        "value": true',
        '    }',
        ']',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(expectedValue);
    });

    test('Nested data', () => {
      const pathOne = getPath('nested1.json');
      const pathTwo = getPath('nested2.json');

      const expectedValue = [
        '[',
        '    {',
        '        "key": "common",',
        '        "type": "nested",',
        '        "children": [',
        '            {',
        '                "key": "follow",',
        '                "type": "added",',
        '                "value": false',
        '            },',
        '            {',
        '                "key": "setting1",',
        '                "type": "unchanged",',
        '                "value": "Value 1"',
        '            },',
        '            {',
        '                "key": "setting2",',
        '                "type": "removed",',
        '                "value": 200',
        '            },',
        '            {',
        '                "key": "setting3",',
        '                "type": "updated",',
        '                "oldValue": true,',
        '                "value": null',
        '            },',
        '            {',
        '                "key": "setting4",',
        '                "type": "added",',
        '                "value": "blah blah"',
        '            },',
        '            {',
        '                "key": "setting5",',
        '                "type": "added",',
        '                "value": {',
        '                    "key5": "value5"',
        '                }',
        '            },',
        '            {',
        '                "key": "setting6",',
        '                "type": "nested",',
        '                "children": [',
        '                    {',
        '                        "key": "doge",',
        '                        "type": "nested",',
        '                        "children": [',
        '                            {',
        '                                "key": "wow",',
        '                                "type": "updated",',
        '                                "oldValue": "",',
        '                                "value": "so much"',
        '                            }',
        '                        ]',
        '                    },',
        '                    {',
        '                        "key": "key",',
        '                        "type": "unchanged",',
        '                        "value": "value"',
        '                    },',
        '                    {',
        '                        "key": "ops",',
        '                        "type": "added",',
        '                        "value": "vops"',
        '                    }',
        '                ]',
        '            }',
        '        ]',
        '    },',
        '    {',
        '        "key": "group1",',
        '        "type": "nested",',
        '        "children": [',
        '            {',
        '                "key": "baz",',
        '                "type": "updated",',
        '                "oldValue": "bas",',
        '                "value": "bars"',
        '            },',
        '            {',
        '                "key": "foo",',
        '                "type": "unchanged",',
        '                "value": "bar"',
        '            },',
        '            {',
        '                "key": "nest",',
        '                "type": "updated",',
        '                "oldValue": {',
        '                    "key": "value"',
        '                },',
        '                "value": "str"',
        '            }',
        '        ]',
        '    },',
        '    {',
        '        "key": "group2",',
        '        "type": "removed",',
        '        "value": {',
        '            "abc": 12345,',
        '            "deep": {',
        '                "id": 45',
        '            }',
        '        }',
        '    },',
        '    {',
        '        "key": "group3",',
        '        "type": "added",',
        '        "value": {',
        '            "fee": 100500,',
        '            "deep": {',
        '                "id": {',
        '                    "number": 45',
        '                }',
        '            }',
        '        }',
        '    }',
        ']',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(expectedValue);
    });
  });
});
