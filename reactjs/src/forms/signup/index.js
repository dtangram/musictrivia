import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
// import { Link } from 'react-router-dom';
import '../../css/main.css';
import container from './container';

class Signup extends React.Component {
  state = {
    username: undefined,
    email: undefined,
    password: undefined,
    // type: '',
    type: 'regular',
  }

  componentDidMount() {
    const { fetchUser, match: { params: { id } } } = this.props;
    if (id) fetchUser(id);

    this.loadData();
    this.inputFocus.focus();
  }

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
      fetchUser,
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchUser(id);
    // update the state with the data from the updated item
    const { signup } = this.props;
    this.setState({ ...signup });
  };

  save = (event) => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();

    const {
      createUser,
      updateUser,
      match: {
        params: { id },
      },
      history,
    } = this.props;

    const {
      username, email, password, type,
    } = this.state;

    if (id) {
      updateUser({
        id,
        username,
        email,
        password,
        type,
      }).then(() => history.push('/login'));
    } else {
      createUser({
        username,
        email,
        password,
        type,
      }).then(() => {
        if (type === 'github') {
          window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}&scope=identity.basic,identity.email`;
        } else if (type === 'regular') {
          history.push('/login');
        }
      });
    }
  };

  handleChange(event) {
    this.setState({
      type: event.target.value,
    });
  }

  render() {
    const {
      signup: {
        username: defaultUsername = '',
        email: defaultEmail = '',
        password: defaultPassword = '',
        // type: defaultType = '',
        type: defaultType = 'regular',
      },
    } = this.props;

    const {
      // get the value from the state and if it doesn't exist use the prop
      username = defaultUsername,
      email = defaultEmail,
      password = defaultPassword,
      type = defaultType,
    } = this.state;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <section className="wrapper wrapperOne">
            <h3>Sign Up</h3>

            <form method="POST" onSubmit={this.save}>
              <fieldset>
                <label htmlFor="username">
                  Username

                  <input
                    ref={(input) => { this.inputFocus = input; }}
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </label>

                <label htmlFor="email">
                  Email

                  <input
                    id="email"
                    type="text"
                    name="email"
                    value={email}
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

                <label className="labelRadio" htmlFor="github">
                  <input
                    type="radio"
                    value="github"
                    name="type"
                    checked={type === 'github'}
                    onChange={this.handleChange.bind(this)}
                  />

                  GitHub
                </label>

                <label className="labelRadio" htmlFor="regular">
                  <input
                    type="radio"
                    value="regular"
                    name="type"
                    defaultChecked={type === 'regular'}
                    onChange={this.handleChange.bind(this)}
                  />

                  Regular
                </label>
              </fieldset>

              <input
                id="submitQ1"
                className="submit"
                type="submit"
                value="Submit"
              />
            </form>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    type: PropTypes.string,
  }),
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

Signup.defaultProps = {
  signup: {},
};

export default container(Signup);
