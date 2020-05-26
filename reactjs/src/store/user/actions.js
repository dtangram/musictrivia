import API from '../../API';
import {
  SET_USER_PROFILE,
} from '../actionTypes';

export const fetchLoginUser = id => async (dispatch, getState) => {
  const userId = localStorage.getItem('id');
  // pull the signup out of the state
  const { users: { byId: { [id]: existingsignup } = {} } = {} } = getState();
  // if the signup already exists, don't do anything
  if (existingsignup) return;
  // get the details of the signup
  const user = await API.get(`/users/${userId}`);
  // update the state with the signup
  dispatch({ type: SET_USER_PROFILE, user });
};

export default fetchLoginUser;
