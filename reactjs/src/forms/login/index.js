import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
// import { Redirect } from 'react-router-dom';
import { Link as RRLink, Redirect } from 'react-router-dom';
import Link from '../../link';
import '../../css/main.css';
import LoginContainer from './container';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    const {
      loginUser, verifyGitHubCode, match: { params: { id, code } },
    } = this.props;
    if (id) loginUser(id);

    // if there is code verify it
    if (code) { verifyGitHubCode(code); }

    this.loadData();
    // this.redirectToGitHub();
    // this.inputFocus.focus();

    // const { location, verifyGitHubCode } = this.props;
    // // get the query params from the url query string
    // const queryParams = new URLSearchParams(location.search);
    // // get the code if there is one from github
    // const code = queryParams.get('code');
    // // if there is code verify it
    // if (code) { verifyGitHubCode(code); }
  }

  // handleInputChange = (event) => {
  //   // pull the name of the input and value of input out of the even object
  //   const { target: { name, value } } = event;
  //   // update the state to a key of the name of the input and value of the value of the input
  //   // ex: type: 'private'
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loadData = async () => {
    const {
      match: {
        params: { id },
      },
      loginUser,
      verifyGitHubCode,
    } = this.props;
    // if no id don't load the user
    if (!id) return;
    await loginUser(id); verifyGitHubCode();
    // update the state with the data from the updated user
    const { auth } = this.props;
    this.setState({ ...auth });
  };

  submitHandler = (event) => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();

    const {
      loginUser,
      history,
      match: {
        params: { id },
      },
    } = this.props;
    const {
      username, password,
    } = this.state;

    if (!id) {
      loginUser({
        username,
        password,
      }).then(() => {
        const token = localStorage.getItem('token');
        if (token) {
          history.push('/');
        } else {
          console.log('Not logged in!');
        }
      });
    }
  };

  redirectToGitHub = () => {
    let GITHUB_URL = 'https://github.com/login/oauth/authorize?';
    GITHUB_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
    GITHUB_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
    // GITHUB_URL += '&scope=identity.basic,identity.email';
    window.location = GITHUB_URL;
    // let GITHUB_URL = 'https://github.com/oauth/authorize?';
    // GITHUB_URL += 'client_id=116dde797c68291268c9';
    // GITHUB_URL += '&redirect_uri=https://musictriviaquiz.herokuapp.com/login';
    // // GITHUB_URL += '&scope=identity.basic,identity.email';
    // window.location = GITHUB_URL;
  }

  render() {
    // const { loggedIn } = this.props;
    // if (loggedIn) return <Link to="/admin/quizzes/list" />;

    const {
      auth: {
        username: defaultUsername = '',
        password: defaultPassword = '',
      },
      // user,
      loggedIn,
    } = this.props;

    const {
      username = defaultUsername,
      password = defaultPassword,
    } = this.state;

    if (loggedIn) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <section className="wrapper wrapperOne">
            <h3>Login with Username</h3>

            <form method="POST" onSubmit={this.submitHandler}>
              <fieldset>
                <label htmlFor="username">
                  Username

                  <input
                    // ref={(input) => { this.inputFocus = input; }}
                    id="username"
                    type="username"
                    name="username"
                    value={username}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </label>

                <label htmlFor="password">
                  Password

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </label>
              </fieldset>

              <input
                id="submitQ1"
                className="submit"
                type="submit"
                value="Submit"
              />
            </form>

            <div>
              <p>
                <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`}>Login with Github</a>
                <br />
                <Link url="/signup" title="Need an Account?" />
              </p>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  // users: PropTypes.shape({
  //   id: PropTypes.string,
  //   username: PropTypes.string,
  //   password: PropTypes.string,
  // }),
  // user: PropTypes.shape({
  //   data: PropTypes.shape({
  //     id: PropTypes.string,
  //   }),
  //   // isLoading: PropTypes.bool.isRequired
  // }).isRequired,
  loginUser: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
  loggedIn: PropTypes.bool,
  verifyGitHubCode: PropTypes.func.isRequired,
};

Login.defaultProps = {
  loggedIn: false,
  auth: {},
};

export default LoginContainer(Login);
