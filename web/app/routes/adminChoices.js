// import the express router
const router = require('express').Router();

// load the controller
const choiceCtrl = require('../controllers/choices');
const validationCtrl = require('../controllers/validation');

// GET /admin/choices/delete/:id - deletes a choice
router.get('/delete/:id', [
  validationCtrl.validate('deleteChoice'),
  choiceCtrl.goBackOnError,
  choiceCtrl.deleteChoice,
]);

// GET /admin/choices/edit/:id - loads the edit form
router.get('/edit/:id', choiceCtrl.renderEditForm);

// POST /admin/choices/edit/:id - validate the data and than save it
router.post('/edit/:id', [
  validationCtrl.validate('editChoice'),
  choiceCtrl.renderChoiceFormWithErrors,
  choiceCtrl.saveChoice,
]);

// GET /admin/choices/new - loads the form to create a new choice
router.get('/new/:questionId', choiceCtrl.renderChoiceForm);

// POST /admin/choices/new - validate the data and than save it
router.post('/new/:questionId', [
  validationCtrl.validate('createChoice'),
  choiceCtrl.renderChoiceFormWithErrors,
  choiceCtrl.saveChoice,
]);


// export the route from this file
module.exports = router;
