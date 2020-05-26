import { connect } from 'react-redux';
// pull actions out that we want to use in this component
import { loginUser, fetchLoginUser, logout } from '../store/auth/actions';

function mapStateToProps(state) {
  // get any information out of the state that we need for this component.
  // below line is the same as `const loggedIn = state.auth.loggedIn`
  const { auths: { auths } } = state;
  // return a new object that will be added to the props
  return { auths };
}

// map action functions to props
const mapDispatchToProps = { loginUser, fetchLoginUser, logout };
// export the redux connected version of the container.
export default connect(mapStateToProps, mapDispatchToProps);
