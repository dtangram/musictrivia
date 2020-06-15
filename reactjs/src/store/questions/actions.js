import API from '../../API';
import {
  SET_QUIZ_QUESTIONS,
  SET_QUESTION,
  ADD_QUIZ_QUESTION,
  REMOVE_QUESTION,
} from '../actionTypes';
import { shouldLoad } from '../_utils';
import { fetchQuestionChoices } from '../choices/actions';

export const fetchQuizQuestions = quizId => async (dispatch, getState) => {
  // get the timestamp of when this quiz was last loaded (default to 0)
  const { questions: { quizLoadedAt: { [quizId]: loadedAt = 0 } } } = getState();
  // run the action to get the choices for this question

  if (!shouldLoad(loadedAt)) return;
  // get the questions for this quiz
  const questions = await API.get(`/questions?quizId=${quizId}`);
  // get the questions for this quiz
  // await API.get(`/questions/${questions.id}`);

  const choices = [];

  questions.forEach((question) => {
    choices.push(API.get(`/choices?questionId=${question.id}`));
    dispatch(fetchQuestionChoices(question.id));
  });
  // dispatch the action with the questions and the id of the quiz
  dispatch({
    type: SET_QUIZ_QUESTIONS, questions, quizId, choices,
  });
};

export const fetchQuestion = id => async (dispatch, getState) => {
  // pull the question out of the state
  const { questions: { byId: { [id]: existingQuestion } = {} } = {} } = getState();
  // if the question already exists, don't do anything
  if (existingQuestion) return;
  // get the details of the question
  const question = await API.get(`/questions/${id}`);
  // update the state with the question
  dispatch({ type: SET_QUESTION, question });
};

// export const saveQuestion = question => async (dispatch) => {
//   if (question.id) {
//     // make the update api call to save the changes
//     const updatedQuestion = await API.put(`/questions/${question.id}`, question);
//     // update the state
//     dispatch({ type: SET_QUESTION, question: { ...question, ...updatedQuestion } });
//   } else {
//     // make the create api call to make a new question
//     const newQuestion = await API.post('/questions', question);
//     // add the new question
//     dispatch({ type: SET_QUESTION, question: { ...question, ...newQuestion } });
//     dispatch({ type: ADD_QUIZ_QUESTION, id: newQuestion.id, quizId: question.quizId });
//   }
// };

export const createQuestion = question => async (dispatch) => {
  // make the create api call to make a new question
  const newQuestion = await API.post('/questions', question);
  // add the new question
  dispatch({ type: SET_QUESTION, question: { ...question, ...newQuestion } });
  dispatch({ type: ADD_QUIZ_QUESTION, id: newQuestion.id, quizId: question.quizId });
};

export const updateQuestion = question => async (dispatch) => {
  if (question.id) {
    // make the update api call to save the changes
    const updatedQuestion = await API.put(`/questions/${question.id}`, {
      title: question.title,
    });
    // update the state
    dispatch({ type: SET_QUESTION, question: { ...question, ...updatedQuestion } });
  }
};

export const deleteQuestion = id => async (dispatch) => {
  // send the delete to the api
  await API.delete(`/questions/${id}`);
  // remove the question with the id to remove
  dispatch({ type: REMOVE_QUESTION, id });
};
