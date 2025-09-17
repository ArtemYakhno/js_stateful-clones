/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        result.push({ ...stateCopy }); // робимо копію
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        result.push({ ...stateCopy }); // робимо копію
        break;

      case 'clear':
        clearProperties(stateCopy);
        result.push({ ...stateCopy }); // робимо копію
        break;

      default:
        return;
    }
  }

  return result;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

const currentState = {
  foo: 'bar',
  bar: 'foo',
};

const stateHistory = transformStateWithClones(currentState, [
  {
    type: 'addProperties',
    extraData: { name: 'Jim', hello: 'world' },
  },
  {
    type: 'removeProperties',
    keysToRemove: ['bar', 'hello'],
  },
  {
    type: 'addProperties',
    extraData: { another: 'one' },
  },
]);

console.log(stateHistory);

module.exports = transformStateWithClones;
