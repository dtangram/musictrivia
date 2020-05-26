const bcrypt = require('bcrypt');
// load in the quiz Model
const { Users } = require('../models');

exports.getUsers = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // run the find all function on the model
  // filter the decisions to only decisions that were created by this user
  const userUsers = await Users.findAll({ where: { id } });
  // respond with json of the user decisions array
  res.json(userUsers);
};

// get all the quizs with a type of public
exports.getGithub = async (req, res) => {
  // run the find all function on the model
  const githubUsers = await Users.findAll({ where: { type: 'github' } });
  // respond with json of the public quizs array
  res.json(githubUsers);
};

// get all the quizs with a type of private
exports.getRegular = async (req, res) => {
  // run the find all function on the model
  const regularUsers = await Users.findAll({ where: { type: 'regular' } });
  // respond with json of the public quizs array
  res.json(regularUsers);
};

// find one quiz by id
exports.getOneById = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // search our quiz model for the quiz
  const quiz = await Users.findByPk(id);
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
exports.createQuizUser = async (req, res) => {
  // get the username, email, password and type values from the request body
  const { username, email, type } = req.body;

  try {
    // generate number of rounds for salt for bcrypt
    const saltRounds = await bcrypt.genSalt(10);
    // create hash variable to by passing the password input and salt variable
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    // store hash in password input (req.body.password)
    const password = hash;
    // create the item and save the new id
    const newUser = Users.create({
      username, access_token: process.env.SECRET, email, password, type,
    });

    // send the new id back to the request
    res.json({ id: newUser.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }

  // const saltRounds = await bcrypt.genSalt(10);
  // const hash = await bcrypt.hash(req.body.password, saltRounds);
  // const password = hash;
  // // create the item and save the new id
  // const newUser = Users.create({
  //   username, email, password, type,
  // });
  //
  // // send the new id back to the request
  // res.json({ id: newUser.id });

  // // create the item and save the new id
  // const newUser = await Users.create({
  //   username, email, password, type,
  // });
};

// update an existing quiz
exports.updateQuizUser = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;

  try {
    // update the quiz with the request body
    const [, [updatedUser]] = await Users.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated quiz back to the front-end
    res.json(updatedUser);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a quiz
exports.removeUser = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // remove the quiz
  await Users.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};

// Made changes to add user to database.
