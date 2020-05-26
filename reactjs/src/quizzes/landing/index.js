import React from 'react';
import PropTypes from 'prop-types';
import '../../css/main.css';
import { Link } from 'react-router-dom';
import LandingContainer from './container';

class Landing extends React.Component {
  componentDidMount() {
    const { fetchPublicQuizzes } = this.props;
    fetchPublicQuizzes();
  }

  render() {
    const { publicQuizzes } = this.props;

    if (publicQuizzes === null) return null;
    return (
      <React.Fragment>
        <section>
          <h1>Music Trivia</h1>
          <div className="graphic" alt="Small orange, rectangle graphic." />

          <div id="bck" className="carousel slide" data-ride="carousel">
            <ul id="bckRotate" className="carousel-inner">
              <li className="carousel-item active" title="Photo of Run-DMC on stage" alt="Photo of Run-DMC on stage" />
              <li className="carousel-item" title="Photo of Soundgarden" alt="Photo of Soundgarden" />
              <li className="carousel-item" title="Photo of LL Cool J at concert" alt="Photo of LL Cool J at concert" />
              <li className="carousel-item" title="Photo of Nirvana" alt="Photo of Nirvana" />
              <li className="carousel-item" title="Photo of Childish Gambino" alt="Photo of Childish Gambino" />
            </ul>
          </div>
        </section>

        <section>
          <h2>Quizzes</h2>
          <div className="graphic" alt="Small orange, rectangle graphic." />

          <div className="container">
            <div className="row">
              
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchPublicQuizzes: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  publicQuizzes: [],
  // userQuizzes: [],
};

export default LandingContainer(Landing);
