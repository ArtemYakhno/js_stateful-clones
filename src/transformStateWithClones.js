/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unsupported action type: ' + action.type);
    }

    result.push({ ...stateCopy });
  }

  return result;
}

function addProperties(state, extraData) {
  if (extraData && typeof extraData === 'object') {
    Object.assign(state, extraData);
  }
}

function removeProperties(state, keysToRemove) {
  if (!Array.isArray(keysToRemove) || keysToRemove.length === 0) {
    return;
  }

  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
