export default {
  empty: '',
  nested: [
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
  ].join('\n'),
  shallow: [
    "Property 'follow' was removed",
    "Property 'proxy' was removed",
    "Property 'timeout' was updated. From 50 to 20",
    "Property 'verbose' was added with value: true",
  ].join('\n'),
  similar: '',
};
