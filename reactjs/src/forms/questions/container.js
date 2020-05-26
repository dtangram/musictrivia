import { connect } from 'react-redux';
import { fetchQuestion, createQuestion, updateQuestion } from '../../store/questions/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    questions: {
      byId: {
        // find the key with the id from the route and pull out the question
        [id]: question,
      },
    },
  } = state;

  return { question };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchQuestion, createQuestion, updateQuestion };
export default connect(mapStateToProps, mapDispatchToProps);
