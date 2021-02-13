import genDiff from '../src/genDiff.js';
import buildGetPath from './utils/getPathFactory.js';

describe('genDiff common tests', () => {
  test('Throw error on incompatible extention', () => {
    const getPath = buildGetPath(import.meta.url, '../__fixtures__');
    const filePath = getPath('incompatible.html');

    const invokeErrorCall = () => genDiff(filePath, filePath);

    expect(invokeErrorCall).toThrow(
      "Comparison of '.html' files is not supported.",
    );
  });

  test('Throw error on incompatible format', () => {
    const getPath = buildGetPath(import.meta.url, '../__fixtures__/json');
    const filePath = getPath('empty.json');

    const invokeErrorCall = () => genDiff(filePath, filePath, 'colourful');

    expect(invokeErrorCall).toThrow('Format colourful is not supported.');
  });
});
