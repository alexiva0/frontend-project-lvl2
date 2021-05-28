import path from 'path';
import genDiff from '../index.js';
import getDirname from '../tools/get-dirname.js';

const __dirname = getDirname(import.meta.url);

describe('genDiff common tests', () => {
  test('Throw error on incompatible extention', () => {
    const filePath = path.join(__dirname, '..', '__fixtures__', 'incompatible.html');

    const invokeErrorCall = () => genDiff(filePath, filePath);

    expect(invokeErrorCall).toThrow(
      "Comparison of '.html' files is not supported.",
    );
  });

  test('Throw error on incompatible format', () => {
    const filePath = path.join(__dirname, '..', '__fixtures__/json', 'empty.json');

    const invokeErrorCall = () => genDiff(filePath, filePath, 'colourful');

    expect(invokeErrorCall).toThrow('Format colourful is not supported.');
  });
});
