import React from 'react';
import API from '../API';

export default function container(Component) {
  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
    }

    logout = () => {
      localStorage.removeItem('token');
      this.setState({ loggedIn: false });
    }

    verifyGitHubCode = async (code) => {
      const { token, loggedIn } = await API.post('/auth/github', { code, url: process.env.REACT_APP_CALLBACK_URL });
      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    }

    render() {
      const { loggedIn } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          loggedIn={loggedIn}
          logout={this.logout}
          verifyGitHubCode={this.verifyGitHubCode}
        />
      );
    }
  }
  return AuthContainer;
}
