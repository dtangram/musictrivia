// import the express router
const router = require('express').Router();

// load the controller
const quizCtrl = require('../controllers/quizzes');
const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/users');
const validationCtrl = require('../controllers/validation');

// GET / - loads the home page
router.get('/', quizCtrl.renderLanding);

// GET /login - loads the login page
router.get('/login', userCtrl.renderLogin);

// GET /signup - signing up with a username password (form)
router.get('/signup', userCtrl.renderSignup);


// POST /admin/quizzes/new - validate the data and than save it
router.post('/signup', [
  validationCtrl.validate('signup'),
  userCtrl.renderSignupWithErrors,
  userCtrl.signup,
]);

// POST /login - send username and password to API
router.post('/login', [
  validationCtrl.validate('login'),
  userCtrl.renderLoginWithErrors,
  userCtrl.login,
]);

// GET /login/github - sends them to github for authorization
router.get('/login/github', authCtrl.redirectToGithub);

// GET /github/callback - the route that is hit when coming back from github
router.get('/github/callback', authCtrl.verifyGithubCode);

// GET /logout - log the user out of the application
router.get('/logout', authCtrl.logout);

// export the route from this file
module.exports = router;
