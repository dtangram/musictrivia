// load in the question Model
const { Questions } = require('../models');

// get all the questions with a type of public
exports.getQuizQuestions = async (req, res) => {
  // assign quizId to req.query
  const { quizId } = req.query;
  // run the find all function on the model
  const questionQuestions = await Questions.findAll({ where: { quizId } });
  // respond with json of the public questions array
  res.json(questionQuestions);
};

// find one question by id
exports.getOneById = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // search our question model for the question
  const question = await Questions.findByPk(id);
  // if no question is found
  if (!question) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the question is found send it back.
  res.json(question);
};

// add a new question
exports.createQuestion = async (req, res) => {
  // get the title, quizId values from the request body
  const { title, quizId, id: questionId } = req.body;
  // pull the question id from the url params
  // const { questionId } = req.params;

  try {
    // create the item and save the new id
    const newQuestion = await Questions.create({ title, questionId, quizId });

    // send the new id back to the request
    res.json({ id: newQuestion.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing question
exports.updateQuestion = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;

  try {
    // update the question with the request body
    const [, [updatedQuestion]] = await Questions.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated question bback to the front-end
    res.json(updatedQuestion);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a question
exports.removeQuestion = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // remove the question
  await Questions.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
