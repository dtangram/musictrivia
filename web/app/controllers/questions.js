exports.renderQuestionForm = (req, res) => {
  res.render('questions/form', { title: '' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { title } = req.body;
  // send the title and errors as variables to the view.
  res.render('questions/form', { title, errors });
};

exports.saveQuestion = async (req, res) => {
  // get the data the user submitted
  const { title } = req.body;
  // pull the quizId from the url
  const { quizId } = req.params;
  // pull the question id from the url query string
  const { questionId } = req.params;
  // if there is an id, we are editing, if there isn't we are adding
  if (questionId) {
    // make a put request with the updated information
    await req.API.put(`/questions/${questionId}`, { title, quizId });
  } else {
    // send the new question to the api
    await req.API.post('questions/', { title, quizId });
  }

  // redirect to the quiz detail page
  res.redirect('back');
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the question
  const question = await req.API.get(`/questions/${id}`);
  // render the edit form
  res.render('questions/form', question);
};

exports.deleteQuestion = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // pull the quiz id from the url query string
  // const { questionId } = req.query.questionId;
  // send the delete request to the api
  await req.API.delete(`/questions/${id}`);
  // redirect to the quiz detail page
  res.redirect('back');
};


// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};
