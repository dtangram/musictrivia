import { connect } from 'react-redux';
import { fetchUserQuizzes, deleteQuiz } from '../../store/quizzes/actions';

function mapStateToProps(state) {
  // pull the data we need out of the current state
  const { quizzes: { userQuizzes, byId } } = state;
  // using the array of ids, turn the ids into the quizzes using the by id object
  const mappedQuizzes = userQuizzes.map(id => byId[id]);
  // send them to the props of the component
  return { userQuizzes: mappedQuizzes };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchUserQuizzes, deleteQuiz };
export default connect(mapStateToProps, mapDispatchToProps);
