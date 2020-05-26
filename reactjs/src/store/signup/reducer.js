import {
  SET_USER,
  ADD_USER,
  REMOVE_USER,
} from '../actionTypes';

import {
  // arrayToObject,
  removeIdFromArray,
  removeIdFromObject,
} from '../_utils';

const startState = {
  byId: {},
  signups: [],
  signupLoadedAt: 0,

  // signupLoadedAt: {},
  // byId: {},
  // byId: {},
};

export default function signupsReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    case SET_USER: {
      const { signup = {} } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [signup.id]: signup,
        },
      };
    }

    // case SET_USER: {
    //   const { signups = {} } = payload;
    //   return {
    //     ...state,
    //     byId: {
    //       // keep all the current quizzes
    //       ...state.byId,
    //       // turn the array of quizzes into an object that has the ids as keys
    //       ...arrayToObject(signups),
    //     },
    //
    //     signups: signups.map(signup2 => signup2.id),
    //     // set the time loaded to now
    //     signupLoadedAt: Date.now(),
    //   };
    // }

    // case ADD_USER: {
    //   const { id, signups } = payload;
    //   // add the id to the array of all the signups for a specific quiz
    //   const allIds = [...state.byId[signups], id];
    //   return {
    //     ...state,
    //     byId: {
    //       ...state.byId,
    //       // we use a set here because it makes sure that all values are unique
    //       // we don't want the same id more than once in the array
    //       [signups]: [...new Set(allIds)],
    //     },
    //   };
    // }

    case ADD_USER: {
      const { id } = payload;
      // add the id to the array of signup quizzes
      const allIds = [...state.signups, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        signups: [...new Set(allIds)],
      };
    }

    case REMOVE_USER: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        signups: removeIdFromArray(id, state.signups),
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
