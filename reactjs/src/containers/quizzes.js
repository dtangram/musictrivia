import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    // the default state
    state = {
      userQuizzes: [],
      publicQuizzes: [],
    }

    // get this user's quizzes
    fetchUserQuizzes = async () => {
      // get the user quizzes from the api
      const userQuizzes = await API.get('/quizzes');
      // update the state
      this.setState({ userQuizzes });
    }

    // get this public quizzes
    fetchPublicQuizzes = async () => {
      // get the public quizzes from the api
      const publicQuizzes = await API.get('/quizzes/public');
      // update the state
      this.setState({ publicQuizzes });
    }

    render() {
      const { userQuizzes, publicQuizzes } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          fetchUserQuizzes={this.fetchUserQuizzes}
          fetchPublicQuizzes={this.fetchPublicQuizzes}
        />
      );
    }
  };
}
