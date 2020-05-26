// import the express router
const router = require('express').Router();

// load the controller
const questionCtrl = require('../controllers/questions');
const validationCtrl = require('../controllers/validation');

// GET /admin/questions/delete/:id - deletes a question
router.get('/delete/:id', [
  validationCtrl.validate('deleteQuestion'),
  questionCtrl.goBackOnError,
  questionCtrl.deleteQuestion,
]);

// GET /admin/questions/edit/:id - loads the edit form
router.get('/edit/:id', questionCtrl.renderEditForm);

// POST /admin/questions/edit/:id - validate the data and than save it
router.post('/edit/:questionId', [
  validationCtrl.validate('editQuestion'),
  questionCtrl.renderQuestionFormWithErrors,
  questionCtrl.saveQuestion,
]);
// GET /admin/questions/new - loads the form to create a new question
router.get('/new/:quizId', questionCtrl.renderQuestionForm);

// POST /admin/questions/new - validate the data and than save it
router.post('/new/:quizId', [
  validationCtrl.validate('createQuestion'),
  questionCtrl.renderQuestionFormWithErrors,
  questionCtrl.saveQuestion,
]);

// export the route from this file
module.exports = router;
