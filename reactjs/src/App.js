/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import AuthContainer from './containers/auth';
import './css/main.css';
import './css/reset.css';
import './js/index';
// import logo from './logo.svg';
import Header from './header';
import Login from './forms/login';
import Signup from './forms/signup';
import QuizzesListPrivate from './quizzes/list';
import QuizzesListPublic from './quizzes/listPublic';
import Landing from './quizzes/landing';
import QuizzesDetail from './quizzes/detail';
import Quiz from './quizzes/quiz';
import QuizzesForm from './forms/quizzes';
import ChoicesForm from './forms/choices';
import QuestionsForm from './forms/questions';
import Footer from './footer';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="main">
            <Route path="/" component={Header} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/admin/quizzes/new" exact component={QuizzesForm} />
              <Route path="/admin/quizzes/edit/:id" exact component={QuizzesForm} />
              <Route path="/admin/:quizId/questions/new" exact component={QuestionsForm} />
              <Route path="/admin/:quizId/questions/edit/:id" exact component={QuestionsForm} />
              <Route path="/admin/:questionId/choices/new" exact component={ChoicesForm} />
              <Route path="/admin/:questionId/choices/edit/:id" exact component={ChoicesForm} />
              <Route path="/quiz/:id" exact component={Quiz} />
              <Route path="/admin/quizzes/detail/:id" exact component={QuizzesDetail} />
              <Route path="/admin/quizzes/privateQuiz" exact component={QuizzesListPrivate} />
              <Route path="/admin/quizzes/publicQuiz" exact component={QuizzesListPublic} />
            </Switch>
            <Route path="/" exact component={Footer} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
