import {
  SET_QUIZ,
  REMOVE_QUIZ,
  ADD_USER_QUIZ,
  ADD_PUBLIC_QUIZ,
  // REMOVE_PUBLIC_QUIZ,
  SET_USER_QUIZZES,
  SET_PUBLIC_QUIZZES,
} from '../actionTypes';
import API from '../../API';
import { shouldLoad } from '../_utils';
import { fetchQuizQuestions } from '../questions/actions';

const userId = localStorage.getItem('id');

export const fetchQuiz = id => async (dispatch, getState) => {
  // pull the quiz out of the state
  const { quizzes: { byId: { [id]: existingQuiz } } } = getState();
  // run the action to get the options for this quiz
  dispatch(fetchQuizQuestions(id));
  // if the quiz already exists, don't do anything
  if (existingQuiz) return;
  // get the details of the quiz
  const quiz = await API.get(`/quizzes/${userId}`);
  // update the state with the quiz
  dispatch({ type: SET_QUIZ, quiz });
};

export const deleteQuiz = id => async (dispatch, getState) => {
  // send the delete to the api
  await API.delete(`quizzes/${id}`, { params: { id } });
  // dispatch the action to remove the quiz with the id to remove
  dispatch({ type: REMOVE_QUIZ, id });
};

export const createQuiz = quiz => async (dispatch) => {
  // make the create api call to make a new quiz
  const createdQuiz = await API.post('/quizzes', quiz);
  // add the new quiz
  dispatch({ type: SET_QUIZ, quiz: { ...quiz, ...createdQuiz } });
  // append the id to the user's list
  dispatch({ type: ADD_USER_QUIZ, id: createdQuiz.id, userId: quiz.userId });
  // if it's public add it to the public quizzes
  if (quiz.type === 'public') dispatch({ type: ADD_PUBLIC_QUIZ, id: createdQuiz.id, userId: quiz.userId });

  return quiz;
};

export const updateQuiz = quiz => async (dispatch) => {
  if (quiz.id) {
    // make the update api call to save the changes
    const updatedQuiz = await API.put(`/quizzes/${quiz.id}`, { name: quiz.name });
    // update the state
    dispatch({ type: SET_QUIZ, quiz: { ...quiz, ...updatedQuiz } });
    // the type could've changed so we need to keep our publicQuiz updated
    // if (quiz.type === 'private') dispatch({ type: REMOVE_PUBLIC_QUIZ, id: updatedQuiz.id });
    // else if (quiz.type === 'public') dispatch({ type: ADD_PUBLIC_QUIZ, id: updatedQuiz.id });
  }

  return quiz;
};

// get this user's quizzes
export const fetchUserQuizzes = () => async (dispatch, getState) => {
  // get the current state loaded at time
  const { quizzes: { userQuizzesLoadedAt } } = getState();
  // if the last time these quizzes was loaded was longer than the refresh time
  if (!shouldLoad(userQuizzesLoadedAt)) return;
  // get the user quizzes from the api
  const userQuizzes = await API.get(`/quizzes/privateQuiz/privQuiz/${userId}`);
  // update the state
  dispatch({ type: SET_USER_QUIZZES, userQuizzes });
};

// get this public quizzes
export const fetchPublicQuizzes = () => async (dispatch, getState) => {
  // get the current state loaded at time
  const { quizzes: { publicQuizzesLoadedAt } } = getState();
  // if the last time these quizzes was loaded was longer than the refresh time
  if (!shouldLoad(publicQuizzesLoadedAt)) return;
  // get the public quizzes from the api
  const publicQuizzes = await API.get(`/quizzes/publicQuiz/pubQuiz/${userId}`);
  // update the state
  dispatch({ type: SET_PUBLIC_QUIZZES, publicQuizzes });
};
