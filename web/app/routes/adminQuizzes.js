// import the express router
const router = require('express').Router();

// load the controller
const quizCtrl = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');

// GET /admin/quizzes/new - loads the form to create a new quiz
router.get('/new', quizCtrl.renderQuizForm);

// GET /admin/quizzes - loads all the user quizzes
router.get('/list', quizCtrl.renderDashboard);

// GET /admin/quizzes/:id - loads the detail page
router.get('/:id', quizCtrl.renderAdminDetail);

// GET /admin/quizzes/delete/:id - deletes a quiz
router.get('/delete/:id', [
  validationCtrl.validate('deleteQuiz'),
  quizCtrl.goBackOnError,
  quizCtrl.deleteQuiz,
]);

// GET /admin/quizzes/edit/:id - loads the edit form
router.get('/edit/:id', quizCtrl.renderEditForm);

// POST /admin/quizzes/edit/:id - validate the data and than save it
router.post('/edit/:id', [
  validationCtrl.validate('editQuiz'),
  quizCtrl.renderQuizFormWithErrors,
  quizCtrl.saveQuiz,
]);


// POST /admin/quizzes/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createQuiz'),
  quizCtrl.renderQuizFormWithErrors,
  quizCtrl.saveQuiz,
]);

// export the route from this file
module.exports = router;
