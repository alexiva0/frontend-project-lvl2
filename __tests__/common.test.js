import path from 'path';
import genDiff from '../index.js';

describe('genDiff common tests', () => {
  test('Throw error on incompatible extention', () => {
    const filePath = path.join('__fixtures__', 'incompatible.html');

    const invokeErrorCall = () => genDiff(filePath, filePath);

    expect(invokeErrorCall).toThrow(
      "Comparison of '.html' files is not supported.",
    );
  });

  test('Throw error on incompatible format', () => {
    const filePath = path.join('__fixtures__/json', 'empty.json');

    const invokeErrorCall = () => genDiff(filePath, filePath, 'colourful');

    expect(invokeErrorCall).toThrow('Format colourful is not supported.');
  });
});
