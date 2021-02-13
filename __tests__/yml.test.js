import genDiff from '../src/genDiff.js';
import buildGetPath from './utils/getPathFactory.js';

const BASE_YML_PATH = '../__fixtures__/yml';

describe('genDiff yml support', () => {
  const getPath = buildGetPath(import.meta.url, BASE_YML_PATH);

  test('Stylish formatter', () => {
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

  test('Plain formatter', () => {
    const pathOne = getPath('nested1.yml');
    const pathTwo = getPath('nested2.yml');

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

  test('JSON formatter', () => {
    const pathOne = getPath('nested1.yml');
    const pathTwo = getPath('nested2.yml');

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
