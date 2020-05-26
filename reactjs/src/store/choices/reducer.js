import {
  SET_CHOICES,
  SET_CHOICE,
  UPDATE_CHOICE,
  ADD_CHOICE,
  REMOVE_CHOICE,
} from '../actionTypes';

import {
  arrayToObject,
  removeIdFromObject,
  removeIdFromArray,
} from '../_utils';

const startState = {
  choices: [],
  choiceLoadedAt: 0,
  byQuestionId: {},
  byId: {},
};

export default function choicesReducer(state = startState, action) {
  // pull out the type and save every thing else to "payload"
  const { type, ...payload } = action;
  // see if the action type matches any that should make changes to this state
  switch (type) {
    case SET_CHOICES: {
      const { choices = [], questionId } = payload;
      return {
        ...state,
        quizLoadedAt: {
          ...state.quizLoadedAt,
          // set the quiz id to now's timestamp so we can track loading
          [questionId]: Date.now(),
        },

        byQuestionId: {
          ...state.byQuestionId,
          // create an array of all the ids for this quiz
          [questionId]: choices.map(choice => choice.id),
        },

        byId: {
          ...state.byId,
          // convert choices array to object using the id as keys
          ...arrayToObject(choices),
        },
      };
    }

    case SET_CHOICE: {
      const { choice = {} } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [choice.id]: choice,
        },
      };
    }

    // case ADD_CHOICE: {
    //   const { id, questionId } = payload;
    //   // add the id to the array of all the choices for a specific quiz
    //   const allIds = [...state.byQuestionId[questionId], id];
    //   return {
    //     ...state,
    //     byQuestionId: {
    //       ...state.byQuestionId,
    //       // we use a set here because it makes sure that all values are unique
    //       // we don't want the same id more than once in the array
    //       [questionId]: [...new Set(allIds)],
    //     },
    //   };
    // }

    case ADD_CHOICE: {
      const { id } = payload;
      // add the id to the array of user quizzes
      const allIds = [...state.choices, id];
      return {
        ...state,
        // we use a set here because it makes sure that all values are unique
        // we don't want the same id more than once in the array
        choices: [...new Set(allIds)],
      };
    }

    case UPDATE_CHOICE: {
      const { id, questionId } = payload;
      // add the id to the array of all the choices for a specific quiz
      const allIds = [...state.byQuestionId[questionId], id];
      return {
        ...state,
        byQuestionId: {
          ...state.byQuestionId,
          // we use a set here because it makes sure that all values are unique
          // we don't want the same id more than once in the array
          [questionId]: [...new Set(allIds)],
        },
      };
    }

    case REMOVE_CHOICE: {
      const { id } = payload;
      // pull the quiz id out of the existing object so we can remove it from the array
      const { questionId } = state.byId[id];
      return {
        ...state,
        // remove the id from the object of all the choices
        byId: removeIdFromObject(id, state.byId),
        byQuestionId: {
          ...state.byQuestionId,
          // remove the choice id from the array for the quiz it belongs to
          [questionId]: removeIdFromArray(id, state.byQuestionId[questionId]),
        },
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
