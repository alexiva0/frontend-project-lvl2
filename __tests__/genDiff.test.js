import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Empty files', () => {
  const pathOne = path.join(__dirname, '../__fixtures__/empty1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/empty1.json');

  expect(genDiff(pathOne, pathTwo)).toEqual('{}');
});

test('Similar files', () => {
  const pathOne = path.join(__dirname, '../__fixtures__/similar1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/similar2.json');

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
  const pathOne = path.join(__dirname, '../__fixtures__/onlyAdded1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/onlyAdded2.json');

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
  const pathOne = path.join(__dirname, '../__fixtures__/onlyDeleted1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/onlyDeleted2.json');

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
  const pathOne = path.join(__dirname, '../__fixtures__/onlyChanged1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/onlyChanged2.json');

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
  const pathOne = path.join(__dirname, '../__fixtures__/complexDiff1.json');
  const pathTwo = path.join(__dirname, '../__fixtures__/complexDiff2.json');

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
