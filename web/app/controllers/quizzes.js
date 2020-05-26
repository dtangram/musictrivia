exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.renderQuizForm = (req, res) => {
  res.render('quizzes/form', { name: '', type: 'private' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // send the name, type, and errors as variables to the view.
  res.render('quizzes/form', { name, type, errors });
};

exports.saveQuiz = async (req, res) => {
  // get the data the user submitted
  const { name, type } = req.body;
  const { userId } = req.userId;
  // pull the id from the url
  const { id } = req.params;
  // pull the userId id from the url query string
  // const { userId } = req.query;
  // variable to hold the data from our api request
  let data = {};
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/quizzes/${id}`, { name, type, userId });
    res.redirect(`/admin/quizzes/${data.id}`);
  } else {
    // send the new quiz to the api
    data = await req.API.post('/quizzes', { name, type, userId });
    // redirect to the dashboard
  }

  // redirect to the edit quiz form
  // res.redirect('/admin/quizzes/list');
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // console.log(quiz);
  // render the edit form
  res.render('quizzes/form', quiz);
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends them back to the page they came from.
  res.redirect('back');
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  // send the delete request to the api
  await req.API.delete(`quizzes/${id}`);
  // redirect to the dashboard
  res.redirect('/admin/quizzes/list');
};

exports.renderDashboard = async (req, res) => {
  const quizzes = await req.API.get('/quizzes');
  res.render('quizzes/list', { quizzes });
};

exports.renderAdminDetail = async (req, res) => {
  const { id } = req.params;
  // get the details of the quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quiz
  const questions = await req.API.get(`/questions/?quizId=${id}`);
  const choices = [];
  for (let i = 0; i < questions.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    choices[i] = await req.API.get(`/choices/?questionId=${questions[i].id}`);
    // console.log(choices[i]);
  }
  res.render('quizzes/detail', { quiz, questions, choices });
};

exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.userId;
  // get the details of the quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quiz
  const questions = await req.API.get(`/questions/?quizId=${id}`);
  const choices = [];
  for (let i = 0; i < questions.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    choices[i] = await req.API.get(`/choices/?questionId=${questions[i].id}`);
    // console.log(choices[i]);
  }
  res.render('quizzes/quiz', {
    quiz, questions, choices, userId,
  });
};
