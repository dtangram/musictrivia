import API from '../../API';
import {
  SET_LOGGED_IN,
} from '../actionTypes';

export const redirectToGithub = () => async (dispatch) => {
  // the base url
  const { githubURL } = await API.post('https://github.com/login/oauth/authorize?', { client_id: process.env.CLIENT_ID, redirect_uri: process.env.CALLBACK_URL, scope: 'identity.basic,identity.email' });

  dispatch({ type: SET_LOGGED_IN, githubURL });
};

export const verifyGitHubCode = code => async (dispatch) => {
  const { token, loggedIn } = await API.post('/auth/github', { code, url: process.env.CALLBACK_URL });
  localStorage.setItem('token', token);
  dispatch({ type: SET_LOGGED_IN, loggedIn });
};

export const loginUser = auth => async (dispatch) => {
  const { username, password } = auth;
  await API.post('/auth/login', { username, password })
    .then((res) => {
      // console.log('username: ', username, 'password: ', password);
      // console.log('res: ', res);

      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.id);
      }

      return res;
    });

  dispatch({ type: SET_LOGGED_IN, auth });
  // create a uuid for this signin so that we can use it in the reducer for pending and loading
};

export const fetchLoginUser = id => async (dispatch, getState) => {
  // pull the choice out of the state
  const { auths: { byId: { [id]: newlogin } } } = getState();
  // if the choice already exists, don't do anything
  if (newlogin) return;
  // get the details of the choice
  const auth = await API.get(`/users/${id}`);
  // update the state with the choice
  dispatch({ type: SET_LOGGED_IN, auth });
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: SET_LOGGED_IN, loggedIn: false };
};
