import { connect } from 'react-redux';
import { fetchUser, createUser, updateUser } from '../../store/signup/actions';

function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    signups: {
      byId: {
        // find the key with the id from the route and pull out the signup
        [id]: signup,
      },
    },
  } = state;

  return { signup };
}

// set the actions we need in this component
const mapDispatchToProps = { fetchUser, createUser, updateUser };
export default connect(mapStateToProps, mapDispatchToProps);
