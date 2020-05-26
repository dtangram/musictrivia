import React from 'react';
import PropTypes from 'prop-types';
import '../../css/main.css';
import { Redirect } from 'react-router-dom';
import Link from '../../link';
import container from './container';

class QuizzesListPrivate extends React.Component {
  componentDidMount() {
    const { fetchUserQuizzes } = this.props;
    fetchUserQuizzes();
  }

  delete = async (id) => {
    const { deleteQuiz } = this.props;
    await deleteQuiz(id);
    // window.location.reload(false);
  }

  render() {
    const { userQuizzes } = this.props;
    const userId = localStorage.getItem('id');
    if (!userId) return <Redirect to="/" />;
    return (
      <React.Fragment>
        {userId && (
          <div className="quizWrap">
            <div id="quizList">
              {userQuizzes.map(quiz => (
                <section className="wrapper wrapperOne" key={quiz.id}>
                  <h2>{quiz.name}</h2>

                  <p>
                    <Link url={`/quiz/${quiz.id}`} title="Play" />
                    <Link url={`/admin/quizzes/detail/${quiz.id}`} title="Edit" />
                    <button type="submit" onClick={() => this.delete(quiz.id)}>Delete</button>
                  </p>
                </section>
              ))}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

QuizzesListPrivate.propTypes = {
  fetchUserQuizzes: PropTypes.func.isRequired,
  userQuizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  deleteQuiz: PropTypes.func.isRequired,
};


QuizzesListPrivate.defaultProps = {
  userQuizzes: [],
};

export default container(QuizzesListPrivate);
