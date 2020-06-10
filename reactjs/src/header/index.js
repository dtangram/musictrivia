import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import '../css/main.css';
import HeaderContainer from './container';
import logo from '../img/logo.png';

class Header extends React.Component {
  logUserOut = () => {
    const { logout, history } = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    logout();
    history.push('/login');
  }

  render() {
    const userId = localStorage.getItem('id');
    const { loggedIn } = this.props;
    return (
      // HEADER
      <header className="fixed-top">
        <div>
          <Link to="/">
            <div>
              <div>
                <img src={logo} title="Music Trivia Home" alt="Music Trivia Logo" />
              </div>
              <h1>Music Trivia</h1>
            </div>
          </Link>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <div id="navbarResponsive" className="collapse navbar-collapse">
              {userId && (
                <React.Fragment>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item nav-link active currentLink" title="Music Trivia Home"><Link to="/">Home</Link></li>
                    <li className="nav-item nav-link" title="List of Private"><Link to={`/admin/quizzes/${userId}/privateQuiz`}>Private</Link></li>
                    <li className="nav-item nav-link" title="List of Public"><Link to={`/admin/quizzes/${userId}/publicQuiz`}>Public</Link></li>
                    <li className="nav-item nav-link" title="Create New Quiz"><Link to="/admin/quizzes/new">Create</Link></li>
                    <li className="nav-item nav-link" title="Create New Quiz"><Link to="" onClick={() => this.logUserOut()}>Logout</Link></li>
                  </ul>

                  {
                    console.log(loggedIn)
                  }
                </React.Fragment>
              )}

              {!userId && (
                <React.Fragment>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item nav-link active currentLink" title="Music Trivia Home"><Link to="/">Home</Link></li>
                    <li className="nav-item nav-link" title="Music Trivia Sign Up"><Link to="/signup">Sign Up</Link></li>
                    <li className="nav-item nav-link" title="Music Trivia Login"><Link to="/login">Login</Link></li>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>

        <div className="bckColor" />
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
};

Header.defaultProps = {
  loggedIn: true,
};

export default HeaderContainer(Header);
