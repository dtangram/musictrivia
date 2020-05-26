import {
  SET_QUIZ_QUESTIONS,
  SET_QUESTION,
  ADD_QUIZ_QUESTION,
  REMOVE_QUESTION,
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromObject,
  removeIdFromArray,
} from '../_utils';

const startState = {
  questions: [],
  quizLoadedAt: 0,
  byQuizId: {},
  byId: {},
};

export default function questionsReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    case SET_QUIZ_QUESTIONS: {
      const { questions, quizId } = payload;
      return {
        ...state,
        quizLoadedAt: {
          ...state.quizLoadedAt,
          // set the quiz id to current timestamp
          [quizId]: Date.now(),
        },

        byQuizId: {
          ...state.byQuizId,
          // create an array of all the ids for this quiz
          [quizId]: questions.map(question => question.id),
        },

        byId: {
          ...state.byId,
          // convert questions array to object using the id as keys
          ...arrayToObject(questions),
        },
      };
    }

    case SET_QUESTION: {
      const { question = {} } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [question.id]: question,
        },
      };
    }

    // case ADD_QUIZ_QUESTION: {
    //   const { id } = payload;
    //   // add the id to the array of all the questions for a specific quiz
    //   const allIds = [...state.byQuizId[quizId], id];
    //   return {
    //     ...state,
    //     byQuizId: {
    //       ...state.byQuizId,
    //       // makes sure that all values are unique
    //       [quizId]: [...new Set(allIds)],
    //     },
    //   };
    // }

    case ADD_QUIZ_QUESTION: {
      const { id } = payload;
      // add the id to the array of user quizzes
      const allIds = [...state.questions, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        questions: [...new Set(allIds)],
      };
    }

    case REMOVE_QUESTION: {
      const { id } = payload;
      // pull the quiz id out of the existing object
      const { quizId } = state.byId[id];
      return {
        ...state,
        // remove the id from the object of all the questions
        byId: removeIdFromObject(id, state.byId),
        byQuizId: {
          ...state.byQuizId,
          // remove the question id from the array for the quiz it belongs to
          [quizId]: removeIdFromArray(id, state.byQuizId[quizId]),
        },
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
