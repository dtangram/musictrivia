import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import '../../css/main.css';
import { Redirect } from 'react-router-dom';
import Link from '../../link';
import container from './container';

class QuizzesListPublic extends React.Component {
  componentDidMount() {
    const { fetchPublicQuizzes, match: { params: { userId = localStorage.getItem('id') } } } = this.props;
    fetchPublicQuizzes(userId);
  }

  delete = async (id) => {
    const { deleteQuiz } = this.props;
    await deleteQuiz(id);
    // window.location.reload(false);
  }

  render() {
    const userId = localStorage.getItem('id');
    if (!userId) return <Redirect to="/" />;

    const { publicQuizzes } = this.props;

    return (
      <React.Fragment>
        {(
          <div className="quizWrap">
            <h2>
              Public Quizzes
              <div className="graphic" alt="Small orange, rectangle graphic." />
            </h2>

            <div id="quizList">
              {userId && publicQuizzes.map(quiz => (
                <section className="wrapper wrapperOne" key={quiz.id}>
                  <h2>{quiz.name}</h2>

                  <p>
                    <Link url={`/${userId}/quiz/${quiz.id}`} title="Play" />
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

QuizzesListPublic.propTypes = {
  fetchPublicQuizzes: PropTypes.func.isRequired,
  publicQuizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  deleteQuiz: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
};


QuizzesListPublic.defaultProps = {
  publicQuizzes: [],
};

export default container(QuizzesListPublic);
