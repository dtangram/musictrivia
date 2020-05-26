// pull in the express package
const express = require('express');

// add the logger
const error = require('debug')('web:error');
// middleware for sessions
const expressSession = require('express-session');
// store for saving sessions
const FileStore = require('session-file-store')(expressSession);

// load in the axios middleware
const API = require('./utils/API');
// load in the protectedRoute middleware
const protectedRoute = require('./utils/protectedRoute');

// load routers
const publicRoutes = require('./routes/public');
const quizRoutes = require('./routes/public');
const adminQuizzesRoutes = require('./routes/adminQuizzes');
const adminQuestionsRoutes = require('./routes/adminQuestions');
const adminChoicesRoutes = require('./routes/adminChoices');


// create an express app
const app = express();
// session middleware
app.use(expressSession({
  // another secret used for encoding session data
  secret: process.env.SECRET,
  // should the session save again if nothing has changed?
  resave: false,
  // should sessions be created if they have no data?
  saveUninitialized: false,
  // where to store the session data
  store: new FileStore(),
}));

// function for passing default data to the templates
app.use((req, res, next) => {
  // pull the loggedIn state out of the session
  const { loggedIn = false } = req.session;
  // set it to locals (data passed to templates)
  res.locals.loggedIn = loggedIn;
  // go to the next middleware function
  next();
});

app.use(express.static('public'));

// checks to see if the content-type is url-encoded and parses it into req.body
app.use(express.urlencoded({ extended: true }));

// axios middleware
app.use(API);

// setting pug as the view engine
app.set('view engine', 'pug');

// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);

// setup routers
app.use('/', publicRoutes);
app.use('/quiz', quizRoutes);
app.use('/admin/quizzes', protectedRoute, adminQuizzesRoutes);
app.use('/admin/questions', protectedRoute, adminQuestionsRoutes);
app.use('/admin/choices', protectedRoute, adminChoicesRoutes);


// four params are required to mark this as a error handling middleware
// the comment below this allows for eslint to not throw an error
// because I am not using the next function
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
