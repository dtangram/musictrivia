import { connect } from 'react-redux';
// pull actions out that we want to use in this component
import { verifyGitHubCode, loginUser } from '../../store/auth/actions';

function mapStateToProps(state) {
  // get any information out of the state that we need for this component.
  // below line is the same as `const loggedIn = state.auth.loggedIn`
  const { auths: { loggedIn, auth } } = state;
  // return a new object that will be added to the props
  return { loggedIn, auth };
}

// map action functions to props
const mapDispatchToProps = { verifyGitHubCode, loginUser };
// export the redux connected version of the container.
export default connect(mapStateToProps, mapDispatchToProps);
