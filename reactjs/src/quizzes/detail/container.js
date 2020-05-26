import { connect } from 'react-redux';
import { fetchQuiz } from '../../store/quizzes/actions';
import { fetchQuestion, deleteQuestion } from '../../store/questions/actions';
import { fetchQuestionChoices, deleteChoice } from '../../store/choices/actions';

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps;

  // pull the data we need out of the current state
  const { quizzes: { byId = {} } = {}, questions = {}, choices = {} } = state;

  const questionsList = questions.byQuizId[id] || [];
  const questionsData = {};
  const choicesData = {};
  questionsList.forEach((questionId) => {
    questionsData[questionId] = questions.byId[questionId];
    questionsData[questionId].choices = choices.byQuestionId[questionId] || [];
    questionsData[questionId].choices.forEach((choiceId) => {
      choicesData[choiceId] = choices.byId[choiceId];
    });
  });

  // send them to the props of the component
  return {
    quiz: byId[id],
    questionsList,
    questionsData,
    choicesData,
  };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchQuiz, fetchQuestion, deleteQuestion, fetchQuestionChoices, deleteChoice,
};
export default connect(mapStateToProps, mapDispatchToProps);
