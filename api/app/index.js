// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
const cors = require('cors');

// routes
const quizRouter = require('./routes/quizzes');
const questionRouter = require('./routes/questions');
const choiceRouter = require('./routes/choices');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

// create an express app
const app = express();

// use cross origin to access token in header
app.use(cors({ credentials: true }));

// checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());

// log all requests
app.use(morganDebug('api:request', 'dev'));

// setup the app to use the router at /quizzes
app.use('/quizzes', quizRouter);
// setup the app to use the router at /questions
app.use('/questions', questionRouter);
// setup the app to use the router at /choices
app.use('/choices', choiceRouter);
// setup the app to use the router at /auth
app.use('/auth', authRouter);
// setup the app to use the router at /auth
app.use('/users', usersRouter);

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
