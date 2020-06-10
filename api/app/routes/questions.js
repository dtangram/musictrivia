// import the express router
const router = require('express').Router();

// import the question controller
const questionCtrl = require('../controllers/questions');

// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /questions?quizId=___
router.get('/', questionCtrl.getQuizQuestions);

// POST /questions
router.post('/', questionCtrl.createQuestion);

// GET /questions/:id
router.get('/:id', questionCtrl.getOneById);

// PUT /questions/:id
router.put('/:id', protectedRoute, questionCtrl.updateQuestion);

// DELETE /questions/:id
router.delete('/:id', protectedRoute, questionCtrl.removeQuestion);

// export the route from this file
module.exports = router;
