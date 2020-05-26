import { connect } from 'react-redux';
import { fetchQuiz, createQuiz, updateQuiz } from '../../store/quizzes/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    quizzes: {
      byId: {
        // find the key with the id from the route and pull out the quiz
        [id]: quiz,
      },
    },
  } = state;

  return { quiz };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchQuiz, createQuiz, updateQuiz };
export default connect(mapStateToProps, mapDispatchToProps);
