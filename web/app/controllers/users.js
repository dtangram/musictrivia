const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');

const Users = require('../../../api/app/models/users');

exports.renderLogin = (req, res) => {
  res.render('login', { username: '', password: '' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderLoginWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { email, password } = req.body;
  // send the email, password, and errors as variables to the view.
  res.render('login', {
    email, password, errors,
  });
};

exports.renderSignup = (req, res) => {
  res.render('signup', {
    username: '', email: '', password: '', type: 'regular',
  });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderSignupWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const {
    username, email, password, type,
  } = req.body;
  // send the username, email, password and errors as variables to the view.
  res.render('signup', {
    username, email, password, type, errors,
  });
};

exports.signup = async (req, res) => {
  // get the data the user submitted
  const {
    username, email, password, type = 'regular',
  } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // send the user to the API

  if (id) {
    // send the user to the API
    const { token, loggedIn } = await req.API.post(`/users/${id}`, {
      username, email, password, type,
    });

    req.session.loggedIn = loggedIn;
    req.session.token = token;
  } else {
    await req.API.post('users/', {
      username, email, password, type,
    });
  }
  res.redirect('/');
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });
    const token = jwt.sign({ id: user.id, username }, process.env.SECRET);
    await user.checkPassword(password, user.password);
    res.json({ token, loggedIn: true });
    res.redirect('/admin/quizzes/list');
  } catch (e) {
    // log the error
    error(e);
    // send an unauthorized response if something above fails to work.
    res.status(401).json({ loggedIn: false });
  }
};

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   // pull the id from the url
//   const { id } = req.params;
//   const { token, loggedIn } = await req.API.post(`/users/${id}`, { username, password });
//   const verify = jwt.verify(token, process.env.SECRET);
//   req.session.loggedIn = loggedIn;
//   req.session.token = token;
//   req.session.verify = verify;
//   res.redirect('/admin/quizzes/list');
// };
