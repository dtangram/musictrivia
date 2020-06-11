import API from '../../API';
import {
  SET_CHOICES,
  SET_CHOICE,
  ADD_CHOICE,
  REMOVE_CHOICE,
} from '../actionTypes';
import { shouldLoad } from '../_utils';

export const fetchQuestionChoices = questionId => async (dispatch, getState) => {
  // get the timestamp of when this question was last loaded (default to 0)
  const { choices: { choiceLoadedAt: { [questionId]: loadedAt = 0 } } } = getState();
  // don't do anything else if we can use the cached version
  if (!shouldLoad(loadedAt)) return;
  // get the choices for this quiz
  const choices = await API.get(`/choices?questionId=${questionId}`);
  // dispatch the action with the choices and the id of the quiz
  dispatch({ type: SET_CHOICES, choices, questionId });
};

export const fetchChoice = id => async (dispatch, getState) => {
  // pull the choice out of the state
  const { choices: { byId: { [id]: existingchoice } } } = getState();
  // if the choice already exists, don't do anything
  if (existingchoice) return;
  // get the details of the choice
  const choice = await API.get(`/choices/${id}`);
  // update the state with the choice
  dispatch({ type: SET_CHOICE, choice });
};

export const createChoice = choice => async (dispatch) => {
  // make the create api call to make a new choice
  const newchoice = await API.post('/choices', choice);
  // add the new choice
  dispatch({ type: SET_CHOICE, choice: { ...choice, ...newchoice } });
  dispatch({ type: ADD_CHOICE, id: newchoice.id, choice });
};

// export const saveChoice = choice => async (dispatch) => {
//   if (choice.id) {
//     // make the update api call to save the changes
//     const updatedchoice = await API.put(`/choices/${choice.id}`, choice);
//     // update the state
//     dispatch({ type: SET_CHOICE, choice: { ...choice, ...updatedchoice } });
//   } else {
//     // make the create api call to make a new choice
//     const newchoice = await API.post('/choices', choice);
//     // add the new choice
//     dispatch({ type: SET_CHOICE, choice: { ...choice, ...newchoice } });
//     dispatch({ type: ADD_CHOICE, id: newchoice.id, quizId: choice.quizId });
//   }
// };

export const updateChoice = choice => async (dispatch) => {
  if (choice.id) {
    // make the update api call to save the changes
    const updatedchoice = await API.put(`/choices/${choice.id}`, choice);
    // update the state
    dispatch({ type: SET_CHOICE, choice: { ...choice, ...updatedchoice } });
  }
};

export const deleteChoice = id => async (dispatch) => {
  // send the delete to the api
  await API.delete(`/choices/${id}`);
  // dispatch the action to remove the choice with the id to remove
  dispatch({ type: REMOVE_CHOICE, id });
};
