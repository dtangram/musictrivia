exports.renderChoiceForm = (req, res) => {
  res.render('choices/form', { value: '', type: 'incorrect' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { value, type } = req.body;
  // send the value, and errors as variables to the view.
  res.render('choices/form', { value, type, errors });
};

exports.saveChoice = async (req, res) => {
  // get the data the user submitted
  const { value, type } = req.body;
  // pull the questionid from the url
  const { questionId } = req.params;
  // pull the id from the url query string
  const { id } = req.params;

  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    await req.API.put(`/choices/${id}`, { value, type, questionId });
  } else {
    // send the new choice to the api
    await req.API.post('/choices', { value, type, questionId });
  }

  // redirect to the quiz detail page
  res.redirect('back');
};

exports.renderEditForm = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // get the details of the choice
  const choice = await req.API.get(`/choices/${id}`);
  // render the edit form
  res.render('choices/form', choice);
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};

exports.deleteChoice = async (req, res) => {
  // get the id from the url params
  const { id } = req.params;
  // send the delete request to the api
  await req.API.delete(`/choices/${id}`);
  // redirect to the question detail page
  res.redirect('back');
};
