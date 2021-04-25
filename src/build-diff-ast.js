import _ from 'lodash';

const buildDiffAST = (dataOne, dataTwo) => {
  const keys = _.sortBy(_.uniq([
    ...Object.keys(dataOne ?? {}),
    ...Object.keys(dataTwo ?? {}),
  ]));

  return keys.map((key) => {
    const valueOne = dataOne[key];
    const valueTwo = dataTwo[key];

    switch (true) {
      case (!(_.has(dataOne, key))):
        return {
          key,
          type: 'added',
          value: valueTwo,
        };

      case (!(_.has(dataTwo, key))):
        return {
          key,
          type: 'removed',
          value: valueOne,
        };

      case (_.isObject(valueOne) && _.isObject(valueTwo)):
        return {
          key,
          type: 'nested',
          children: buildDiffAST(valueOne, valueTwo),
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
  });
};

export default buildDiffAST;
