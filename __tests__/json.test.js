import genDiff from '../src/genDiff.js';
import buildGetPath from './utils/getPathFactory.js';

const BASE_JSON_PATH = '../__fixtures__/json';

describe('genDiff json support', () => {
  const getPath = buildGetPath(import.meta.url, BASE_JSON_PATH);

  describe('Stylish formatter', () => {
    test('Empty files', () => {
      const pathOne = getPath('empty1.json');
      const pathTwo = getPath('empty2.json');

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

  describe('Plain formatter', () => {
    test('Empty files', () => {
      const pathOne = getPath('empty1.json');
      const pathTwo = getPath('empty2.json');

      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual('');
    });

    test('Similar files', () => {
      const pathOne = getPath('similar1.json');
      const pathTwo = getPath('similar2.json');

      expect(genDiff(pathOne, pathTwo, 'plain')).toEqual('');
    });

    test('Complex changes', () => {
      const pathOne = getPath('complexDiff1.json');
      const pathTwo = getPath('complexDiff2.json');

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
      const pathOne = getPath('empty1.json');
      const pathTwo = getPath('empty2.json');

      expect(genDiff(pathOne, pathTwo, 'json')).toEqual('{}');
    });

    test('Similar files', () => {
      const pathOne = getPath('similar1.json');
      const pathTwo = getPath('similar2.json');

      const expectedValue = [
        '{',
        '    "follow": {',
        '        "value": false',
        '    },',
        '    "host": {',
        '        "value": "hexlet.io"',
        '    },',
        '    "proxy": {',
        '        "value": "123.234.53.22"',
        '    },',
        '    "timeout": {',
        '        "value": 50',
        '    }',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(expectedValue);
    });

    test('Complex changes', () => {
      const pathOne = getPath('complexDiff1.json');
      const pathTwo = getPath('complexDiff2.json');

      const expectedValue = [
        '{',
        '    "follow": {',
        '        "type": "removed",',
        '        "value": false',
        '    },',
        '    "host": {',
        '        "value": "hexlet.io"',
        '    },',
        '    "proxy": {',
        '        "type": "removed",',
        '        "value": "123.234.53.22"',
        '    },',
        '    "timeout": {',
        '        "type": "updated",',
        '        "oldValue": 50,',
        '        "value": 20',
        '    },',
        '    "verbose": {',
        '        "type": "added",',
        '        "value": true',
        '    }',
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(expectedValue);
    });

    test('Nested data', () => {
      const pathOne = getPath('nested1.json');
      const pathTwo = getPath('nested2.json');

      const expectedValue = [
        '{',
        '    "common": {',
        '        "children": {',
        '            "follow": {',
        '                "type": "added",',
        '                "value": false',
        '            },',
        '            "setting1": {',
        '                "value": "Value 1"',
        '            },',
        '            "setting2": {',
        '                "type": "removed",',
        '                "value": 200',
        '            },',
        '            "setting3": {',
        '                "type": "updated",',
        '                "oldValue": true,',
        '                "value": null',
        '            },',
        '            "setting4": {',
        '                "type": "added",',
        '                "value": "blah blah"',
        '            },',
        '            "setting5": {',
        '                "type": "added",',
        '                "value": {',
        '                    "key5": "value5"',
        '                }',
        '            },',
        '            "setting6": {',
        '                "children": {',
        '                    "doge": {',
        '                        "children": {',
        '                            "wow": {',
        '                                "type": "updated",',
        '                                "oldValue": "",',
        '                                "value": "so much"',
        '                            }',
        '                        }',
        '                    },',
        '                    "key": {',
        '                        "value": "value"',
        '                    },',
        '                    "ops": {',
        '                        "type": "added",',
        '                        "value": "vops"',
        '                    }',
        '                }',
        '            }',
        '        }',
        '    },',
        '    "group1": {',
        '        "children": {',
        '            "baz": {',
        '                "type": "updated",',
        '                "oldValue": "bas",',
        '                "value": "bars"',
        '            },',
        '            "foo": {',
        '                "value": "bar"',
        '            },',
        '            "nest": {',
        '                "type": "updated",',
        '                "oldValue": {',
        '                    "key": "value"',
        '                },',
        '                "value": "str"',
        '            }',
        '        }',
        '    },',
        '    "group2": {',
        '        "type": "removed",',
        '        "value": {',
        '            "abc": 12345,',
        '            "deep": {',
        '                "id": 45',
        '            }',
        '        }',
        '    },',
        '    "group3": {',
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
        '}',
      ].join('\n');
      expect(genDiff(pathOne, pathTwo, 'json')).toEqual(expectedValue);
    });
  });
});
