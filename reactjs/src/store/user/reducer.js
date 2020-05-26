import {
  SET_USER_PROFILE,
  ADD_USER_PROFILE,
  REMOVE_USER_PROFILE,
} from '../actionTypes';

import {
  // arrayToObject,
  removeIdFromArray,
  removeIdFromObject,
} from '../_utils';

const startState = {
  byId: {},
  users: [],
  userLoadedAt: 0,
};

export default function usersReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    case SET_USER_PROFILE: {
      const { user } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [user.id]: user,
        },
      };
    }

    case ADD_USER_PROFILE: {
      const { id } = payload;
      // add the id to the array of user quizzes
      const allIds = [...state.users, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        users: [...new Set(allIds)],
      };
    }

    case REMOVE_USER_PROFILE: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        users: removeIdFromArray(id, state.users),
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
