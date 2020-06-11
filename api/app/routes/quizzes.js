// import the express router
const router = require('express').Router();

// import the quiz controller
const quizCtrl = require('../controllers/quizzes');

// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /quizzes route using controller middleware
// router.get('/quizzes', quizCtrl.getUserQuizzes);

// GET /quizzes/public
router.get('/pubQuiz/:userId/publicQuiz', quizCtrl.getPublic);

// GET /quizzes route using controller middleware
router.get('/privQuiz/:userId/privateQuiz', quizCtrl.getPrivate);

// POST /quizzes
router.post('/', quizCtrl.createQuiz);

// GET /quizzes/:id
router.get('/:id', quizCtrl.getOneById);

// PUT /quizzes/:id
router.put('/:id', protectedRoute, quizCtrl.updateQuiz);

// DELETE /quizzes/:id
router.delete('/:id', protectedRoute, quizCtrl.removeQuiz);

// export the route from this file
module.exports = router;
