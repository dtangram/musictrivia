import { connect } from 'react-redux';
import {
  fetchChoice, updateChoice, createChoice,
} from '../../store/choices/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    choices: {
      byId: {
        // find the key with the id from the route and pull out the choice
        [id]: choice,
      },
    },
  } = state;

  return { choice };
}

// set the actions we need in this component
const mapDispatchToProps = {
  fetchChoice, updateChoice, createChoice,
};

export default connect(mapStateToProps, mapDispatchToProps);
