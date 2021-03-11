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
        children: getDiffAST(valueOne, valueTwo),
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

function getDiffAST(dataOne, dataTwo) {
  const keys = sortBy(uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ]));

  return keys.reduce((acc, key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];
    return [
      ...acc,
      getDiffNode(valueOne, valueTwo, key),
    ];
  }, []);
}

export default getDiffAST;
