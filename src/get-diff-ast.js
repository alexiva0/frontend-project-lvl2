import { uniq, isObject, sortBy } from 'lodash-es';

const getDiffNode = (valueOne, valueTwo, key) => {
  switch (true) {
    case (valueOne === undefined):
      return {
        key,
        type: 'added',
        value: valueTwo,
      };

    case (valueTwo === undefined):
      return {
        key,
        type: 'removed',
        value: valueOne,
      };

    case (isObject(valueOne) && isObject(valueTwo)):
      return {
        key,
        type: 'nested',
      };

    case (valueOne !== valueTwo):
      return {
        key,
        type: 'updated',
        oldValue: valueOne,
        value: valueTwo,
      };

    default:
      return {
        key,
        type: 'unchanged',
        value: valueOne,
      };
  }
};

const getDiffAST = (dataOne, dataTwo) => {
  const keys = sortBy(uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ]));

  return keys.reduce((acc, key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];
    const diffNode = getDiffNode(valueOne, valueTwo, key);
    const children = diffNode.type === 'nested' ? getDiffAST(valueOne, valueTwo) : undefined;

    return [
      ...acc,
      children ? { ...diffNode, children } : diffNode,
    ];
  }, []);
};

export default getDiffAST;
