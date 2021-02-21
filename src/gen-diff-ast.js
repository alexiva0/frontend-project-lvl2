import { uniq, isObject, sortBy } from 'lodash-es';

const getDiffAST = (dataOne, dataTwo) => {
  const keys = sortBy(uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ]));

  return keys.reduce((acc, key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];

    switch (true) {
      case (valueOne === undefined):
        return [
          ...acc,
          {
            key,
            type: 'added',
            value: valueTwo,
          },
        ];

      case (valueTwo === undefined):
        return [
          ...acc,
          {
            key,
            type: 'removed',
            value: valueOne,
          },
        ];

      case (isObject(valueOne) && isObject(valueTwo)):
        return [
          ...acc,
          {
            key,
            type: 'nested',
            children: getDiffAST(valueOne, valueTwo),
          },
        ];

      case (valueOne !== valueTwo):
        return [
          ...acc,
          {
            key,
            type: 'updated',
            oldValue: valueOne,
            value: valueTwo,
          },
        ];

      default:
        return [
          ...acc,
          {
            key,
            type: 'unchanged',
            value: valueOne,
          },
        ];
    }
  }, []);
};

export default getDiffAST;
