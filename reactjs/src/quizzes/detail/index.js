import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
// import { Link as RRLink } from 'react-router-dom';
import Link from '../../link';
import '../../css/main.css';
import container from './container';

class QuizzesDetail extends React.Component {
  componentDidMount() {
    // get the id from the route params
    const { fetchQuiz, fetchQuestion, match: { params: { id } } } = this.props;
    fetchQuiz(id);
    fetchQuestion(id);
  }

  delete = async (id) => {
    const { deleteQuestion, deleteChoice } = this.props;
    await deleteQuestion(id); deleteChoice(id);
    // window.location.reload(false);
  }

  render() {
    const {
      quiz, questionsList, questionsData, choicesData,
    } = this.props;

    if (!quiz) return null;

    const userId = localStorage.getItem('id');
    if (!userId) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <div id="quizDetail">
            <h2 className="quizItem">
              {quiz.name}
              <br />

              <Link url={`/admin/quizzes/edit/${quiz.id}`} title="Edit Quiz Name" />
              <div className="graphic" alt="Small orange, rectangle graphic." />
            </h2>

            <p>
              <Link className="quizLinkNew" url={`/admin/${quiz.id}/questions/new`} title="Add New Question" />
            </p>

            {questionsList.map((questionId) => {
              const question = questionsData[questionId];
              return (
                <section className="wrapper" key={question.id}>
                  <form>
                    <fieldset>
                      <h3>{question.title}</h3>

                      <Link url={`/admin/${quiz.id}/questions/edit/${question.id}`} title="Edit" />
                      <button type="submit" onClick={() => this.delete(question.id)}>Delete</button>

                      <ul>
                        {question.choices.map((choiceId) => {
                          const choice = choicesData[choiceId];
                          return (
                            <li key={choice.id}>
                              <h3>{choice.value}</h3>

                              <p>
                                <Link url={`/admin/${question.id}/choices/edit/${choice.id}`} title="Edit" />
                                <button type="submit" onClick={() => this.delete(choice.id)}>Delete</button>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </fieldset>
                  </form>

                  <p>
                    <Link className="quizLinkNew" url={`/admin/${question.id}/choices/new`} title="Add New Choice" />
                  </p>
                </section>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

QuizzesDetail.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  questionsList: PropTypes.arrayOf(PropTypes.string),
  questionsData: PropTypes.shape({}),
  choicesData: PropTypes.shape({}),
  fetchQuiz: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
};

QuizzesDetail.defaultProps = {
  quiz: {},
  questionsList: [],
  questionsData: {},
  choicesData: {},
};

export default container(QuizzesDetail);
