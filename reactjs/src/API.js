import axios from 'axios';
import errorLog from 'debug';

const API = axios.create({
  // baseURL: 'https://musictriviaquiz.herokuapp.com/',
  // For Heroku
  baseURL: process.env.DATABASE_URL || 'https://musictriviaquiz.herokuapp.com/',
  client_id: process.env.CLIENT_ID,
  redirect_uri: process.env.CALLBACK_URL,
  scope: 'identity.basic,identity.email',
});

API.interceptors.response.use(
  response => (response ? response.data : {}),
  (error) => {
    errorLog(error);
  },
);

// for each api request going out
API.interceptors.request.use(async (config) => {
  // pull the token out of local storage
  const token = localStorage.getItem('token');
  // if there is no token do nothing
  if (!token) return config;
  // if there is a token, set a header for any request that contains the token
  return {
    ...config,
    headers: { common: { token } },
  };
});

export default API;
