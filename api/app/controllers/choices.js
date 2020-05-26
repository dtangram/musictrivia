// load in the choices Model
const { Choices } = require('../models');

// get all the choicess with a type of public
exports.getQuestionChoices = async (req, res) => {
  const { questionId } = req.query;
  // run the find all function on the model
  const questionChoices = await Choices.findAll({ where: { questionId } });
  // respond with json of the public choicess array
  res.json(questionChoices);
};

// find one choices by id
exports.getOneById = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // search our choices model for the choices
  const choice = await Choices.findByPk(id);
  // if no choices is found
  if (!choice) {
    // return a 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the choices is found send it back.
  res.json(choice);
};


// add a new choices
exports.createChoice = async (req, res) => {
  // get value, type and questionId values from the request body
  const { value, type, questionId } = req.body;

  try {
    // create the item and save the new id
    const newChoice = await Choices.create({ value, type, questionId });

    // send the new id back to the request
    res.json({ id: newChoice.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing choices
exports.updateChoice = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;

  try {
    // update the choice with the request body
    const [, [updatedChoice]] = await Choices.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated choice back to the front-end
    res.json(updatedChoice);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

// delete a choices
exports.removeChoice = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // remove the choices
  await Choices.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
