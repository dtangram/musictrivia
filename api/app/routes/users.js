// import the express router
const router = require('express').Router();

// import the user controller
const userCtrl = require('../controllers/users');

// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /users route using controller middleware
// router.get('/', protectedRoute, userCtrl.getUsers);

// GET /users/public
router.get('/public', userCtrl.getGithub);

// GET /users route using controller middleware
router.get('/public', userCtrl.getRegular);

// POST /users
router.post('/', userCtrl.createQuizUser);

// GET /users/:id
router.get('/:id', userCtrl.getOneById);

// PUT /users/:id
router.put('/:id', userCtrl.updateQuizUser);

// DELETE /users/:id
router.delete('/:id', userCtrl.removeUser);

// export the route from this file
module.exports = router;
