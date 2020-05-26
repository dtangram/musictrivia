const { check, validationResult } = require('express-validator/check');

const checks = {
  username: check('username')
    .exists().withMessage('Username is required')
    .isLength({ min: 2 })
    .withMessage('Username is required to be with at least 2 characters.'),
  email: check('email')
    .exists().withMessage('Email is required.')
    .isEmail()
    .withMessage('Email field must be valid.'),
  password: check('password')
    .exists().withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password is required to be at least 8 characters.'),
  typeS: check('type')
    .exists().withMessage('Signup type is required.')
    .isIn(['github', 'regular'])
    .withMessage('Signup must be GitHub or Regular.'),
  id: check('id')
    .isUUID().withMessage('ID not valid, please try again.'),
  name: check('name')
    .exists().withMessage('Quiz title is required.')
    .isLength(3)
    .withMessage('Quiz title is required to be at least 3 characters.'),
  typeP: check('type')
    .exists().withMessage('Quiz type is required.')
    .isIn(['public', 'private'])
    .withMessage('Quiz must be Public or Private.'),
  userId: check('userId')
    .isUUID().withMessage('User ID not valid, please try again.'),
  title: check('title')
    .exists().withMessage('Question title is required.')
    .isLength(3)
    .withMessage('Quiz title is required to be at least 3 characters.'),
  quizId: check('quizId')
    .isUUID().withMessage('Quiz ID not valid, please try again.'),
  value: check('value')
    .exists().withMessage('Choice value is required.')
    .isLength(1)
    .withMessage('Choice value is required.'),
  typeC: check('type')
    .exists().withMessage('Choice type is required.')
    .isIn(['correct', 'incorrect'])
    .withMessage('Choice must be Correct or Incorrect.'),
  questionId: check('questionId')
    .isUUID().withMessage('Question ID not valid, please try again.'),
};

const checkForErrors = (req, res, next) => {
  // get any errors
  const errors = validationResult(req);
  // if there are errors go to the next error handler middleware with the errors from the validation
  if (!errors.isEmpty()) return next(errors.mapped());
  // if there are NO errors, go to the next normal middleware function
  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'signup': {
      return [checks.username, checks.email, checks.password, checkForErrors];
    }

    case 'login': {
      return [checks.username, checks.password, checkForErrors];
    }

    case 'createQuiz': {
      return [checks.name, checks.typeP, checkForErrors];
    }

    case 'editQuiz': {
      return [checks.id, checks.name, checks.typeP, checkForErrors];
    }

    case 'deleteQuiz': {
      return [checks.id, checkForErrors];
    }

    case 'createQuestion': {
      return [checks.title, checks.quizId, checkForErrors];
    }

    case 'editQuestion': {
      return [checks.questionId, checks.title, checkForErrors];
    }

    case 'deleteQuestion': {
      return [checks.id, checkForErrors];
    }

    case 'createChoice': {
      return [checks.value, checks.typeC, checks.questionId, checkForErrors];
    }

    case 'editChoice': {
      return [checks.id, checks.value, checks.typeC, checkForErrors];
    }

    case 'deleteChoice': {
      return [checks.id, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
