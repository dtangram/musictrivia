// import the express router
const router = require('express').Router();

// import the choice controller
const choiceCtrl = require('../controllers/choices');

// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /choices?questionId=___
router.get('/', choiceCtrl.getQuestionChoices);

// POST /choices
router.post('/', choiceCtrl.createChoice);

// GET /choices/:id
router.get('/:id', choiceCtrl.getOneById);

// PUT /choices/:id
router.put('/:id', protectedRoute, choiceCtrl.updateChoice);

// DELETE /choices/:id
router.delete('/:id', protectedRoute, choiceCtrl.removeChoice);

// export the route from this file
module.exports = router;
