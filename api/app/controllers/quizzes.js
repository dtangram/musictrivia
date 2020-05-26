// load in the quiz Model
const { Quizzes } = require('../models');

// exports.getUserQuizzes = async (req, res) => {
//   // run the find all function on the model
//   // filter the quizzes to only quizzes that were created by this user
//   const userQuizzes = await Quizzes.findAll({ where: { userId: req.params.userId } });
//   // respond with json of the user decisions array
//   res.json(userQuizzes);
// };

// get all the quizzes with a type of public
exports.getPublic = async (req, res) => {
  // run the find all function on the model
  const publicQuizzes = await Quizzes.findAll({ where: { type: 'public' } });
  // respond with json of the public quizs array
  res.json(publicQuizzes);
};

// get all the quizzes with a type of private
exports.getPrivate = async (req, res) => {
  // run the find all function on the model
  const userQuizzes = await Quizzes.findAll({ where: { type: 'private' } });
  // respond with json of the public quizs array
  res.json(userQuizzes);
};

// find one quiz by id
exports.getOneById = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // search our quiz model for the quiz
  const quiz = await Quizzes.findByPk(id);
  // if no quiz is found
  if (!quiz) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the quiz is found send it back.
  res.json(quiz);
};

// add a new quiz
exports.createQuiz = async (req, res) => {
  // get the name, type and userId values from the request body
  const { name, type, userId, id: quizId } = req.body;

  // const { userId } = req.userId;

  try {
    // create the item and save the new id
    // const newQuiz = await Quizzes.create({ name, type, userId });
    const newQuiz = await Quizzes.create({ name, type, userId, quizId });

    // send the new id back to the request
    res.json({ id: newQuiz.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing quiz
exports.updateQuiz = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;

  try {
    // update the quiz with the request body
    const [, [updatedQuiz]] = await Quizzes.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated quiz back to the front-end
    res.json(updatedQuiz);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a quiz
exports.removeQuiz = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // remove the quiz
  await Quizzes.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
