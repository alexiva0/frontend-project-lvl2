import getFileContent from './src/get-file-content.js';
import getDiffAST from './src/get-diff-ast.js';
import getFormatter from './src/formatters/index.js';

const genDiff = (pathOne, pathTwo, format = 'stylish') => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diffAST = getDiffAST(fileOneContent, fileTwoContent);

  const formatter = getFormatter(format);

  return formatter(diffAST);
};

export default genDiff;
