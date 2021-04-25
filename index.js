import getFileContent from './src/get-file-content.js';
import buildDiffAST from './src/build-diff-ast.js';
import getFormatter from './src/formatters/index.js';

const genDiff = (pathOne, pathTwo, format = 'stylish') => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diffAST = buildDiffAST(fileOneContent, fileTwoContent);

  const formatter = getFormatter(format);

  return formatter(diffAST);
};

export default genDiff;
