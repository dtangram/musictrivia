import { connect } from 'react-redux';
import { fetchPublicQuizzes, deleteQuiz } from '../../store/quizzes/actions';

function mapStateToProps(state) {
  // pull the data we need out of the current state
  const { quizzes: { publicQuizzes, byId } } = state;
  // using the array of ids, turn the ids into the quizzes using the by id object
  const mappedQuizzes = publicQuizzes.map(id => byId[id]);
  // send them to the props of the component
  return { publicQuizzes: mappedQuizzes };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchPublicQuizzes, deleteQuiz };
export default connect(mapStateToProps, mapDispatchToProps);
