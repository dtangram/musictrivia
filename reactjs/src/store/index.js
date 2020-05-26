// get all the functions we need from redux
import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
// middleware for making actions asynchronous
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';
// pull our reducers
import auths from './auth/reducer';
import quizzes from './quizzes/reducer';
import choices from './choices/reducer';
import questions from './questions/reducer';
import signups from './signup/reducer';
// combine multiple reducers into one
const rootReducer = combineReducers({
  auths,
  quizzes,
  choices,
  questions,
  signups,
});

// set up middleware
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create a redux store using the combined reducer and middleware functions
const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
