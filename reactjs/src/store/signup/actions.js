import { v4 as uuid } from 'uuid';
import API from '../../API';
import {
  SET_USER,
  ADD_USER,
  REMOVE_USER,
} from '../actionTypes';

export const fetchUser = id => async (dispatch, getState) => {
  // pull the signup out of the state
  const { signups: { byId: { [id]: existingsignup } = {} } = {} } = getState();
  // if the signup already exists, don't do anything
  if (existingsignup) return;
  // get the details of the signup
  const signup = await API.get(`/users/${id}`);
  // update the state with the signup
  dispatch({ type: SET_USER, signup });
};

// export const saveUser = user => async (dispatch) => {
//   if (user.id) {
//     // make the update api call to save the changes
//     const updateduser = await API.put(`/signups/${user.id}`, user);
//     // update the state
//     dispatch({ type: SET_USER, user: { ...user, ...updateduser } });
//   } else {
//     // make the create api call to make a new user
//     const newuser = await API.post('/signups', user);
//     // add the new user
//     dispatch({ type: SET_USER, user: { ...user, ...newuser } });
//     dispatch({ type: ADD_USER, id: newuser.id, quizId: user.quizId });
//   }
// };

export const createUser = signup => async (dispatch) => {
  const id = uuid;
  const newsignup = await API.post('/users', signup);
  // add the new signup
  dispatch({ type: SET_USER, signup: { ...signup, ...newsignup } });
  dispatch({ type: ADD_USER, id });
};

export const updateUser = user => async (dispatch) => {
  if (user.id) {
    // make the update api call to save the changes
    const updatedsignup = await API.put(`/users/${user.id}`, user);
    // update the state
    dispatch({ type: SET_USER, signup: { ...user, ...updatedsignup } });
  }
};

export const deleteUser = id => async (dispatch) => {
  // send the delete to the api
  await API.delete(`/users/${id}`);
  // dispatch the action to remove the signup with the id to remove
  dispatch({ type: REMOVE_USER, id });
};
