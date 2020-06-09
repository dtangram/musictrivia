// action types that should change this state
import {
  SET_USER_QUIZZES,
  SET_PUBLIC_QUIZZES,
  SET_QUIZ,
  ADD_USER_QUIZ,
  ADD_PUBLIC_QUIZ,
  REMOVE_QUIZ,
  // REMOVE_PUBLIC_QUIZ,
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromArray,
  removeIdFromObject,
} from '../_utils';

const startState = {
  // object with all the quizzes with their ids as the keys
  byId: {},
  // array of the user's quizzes
  userQuizzes: [],
  // array of the public quizzes
  publicQuizzes: [],
  // time the user's quizzes were last loaded (default to 0 since they haven't been loaded)
  userQuizzesLoadedAt: 0,
  // time the public quizzes were last loaded (default to 0 since they haven't been loaded)
  publicQuizzesLoadedAt: 0,
};

export default function quizzesReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    // if type is SET_USER_QUIZZES
    case SET_USER_QUIZZES: {
      const { userQuizzes } = payload;
      return {
        // return a new object that has all the properties of the current state
        ...state,
        // privateQuiz object with the ids as the key
        byId: {
          // keep all the current quizzes
          ...state.byId,
          // turn the array of quizzes into an object that has the ids as keys
          ...arrayToObject(userQuizzes),
        },
        // add the userQuizzes from the paylaod
        // userQuizzes,
        // turn the array of quizzes into an array of ids
        userQuizzes: userQuizzes.map(privateQuiz => privateQuiz.id),
        // set the time loaded to now
        userQuizzesLoadedAt: Date.now(),
      };
    }

    // if type is SET_PUBLIC_QUIZZES
    case SET_PUBLIC_QUIZZES: {
      const { publicQuizzes } = payload;
      return {
        // return a new object that has all the properties of the current state
        ...state,
        // publicQuiz object with the ids as the key
        byId: {
          // keep all the current quizzes
          ...state.byId || [],
          // turn the array of quizzes into an object that has the ids as keys
          ...arrayToObject(publicQuizzes || []),
        },
        // add the publicQuizzes from the payload
        // publicQuizzes,
        // turn the array of quizzes into an array of ids
        publicQuizzes: publicQuizzes.map(publicQuiz => publicQuiz.id),
        // set the time loaded to now
        publicQuizzesLoadedAt: Date.now(),
      };
    }

    case SET_QUIZ: {
      const { quiz } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [quiz.id]: quiz,
        },
      };
    }

    case ADD_USER_QUIZ: {
      const { id } = payload;
      // add the id to the array of user quizzes
      const allIds = [...state.userQuizzes, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        userQuizzes: [...new Set(allIds)],
      };
    }

    case ADD_PUBLIC_QUIZ: {
      const { id } = payload;
      // add the id to the array of public quizzes
      const allIds = [...state.publicQuizzes, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        publicQuizzes: [...new Set(allIds)],
      };
    }

    case REMOVE_QUIZ: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        userQuizzes: removeIdFromArray(id, state.userQuizzes),
        publicQuizzes: removeIdFromArray(id, state.publicQuizzes),
      };
    }

    // case REMOVE_PUBLIC_QUIZ: {
    //   const { id } = payload;
    //   return {
    //     ...state,
    //     // remove the id using our utility function
    //     publicQuizzes: removeIdFromArray(id, state.publicQuizzes),
    //   };
    // }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
