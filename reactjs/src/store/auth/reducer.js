// action types that should change this state
import {
  SET_LOGGED_IN,
  REQ_USER_LOGOUT,
} from '../actionTypes';

const startState = {
  loggedIn: !!localStorage.getItem('token'),
};

export default function authReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    // if type is SET_LOGGED_IN
    case SET_LOGGED_IN: {
      const { loggedIn } = payload;
      // return a new object that has all the properties of the current state
      return {
        ...state,
        loggedIn,
      };
    }

    case REQ_USER_LOGOUT: {
      return startState;
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
