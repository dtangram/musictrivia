import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import '../../css/main.css';
import container from './container';

class Quiz extends React.Component {
  componentDidMount() {
    // get the id from the route params
    const { fetchQuiz, fetchQuestion, match: { params: { id } } } = this.props;
    fetchQuiz(id);
    fetchQuestion(id);
  }

  render() {
    const {
      quiz, questionsList, questionsData, choicesData,
    } = this.props;

    if (quiz === null) return null;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <div id="quizQuest">
            <h2>{quiz.name}</h2>

            {questionsList.map((questionId) => {
              const question = questionsData[questionId];
              return (
                <section className="wrapper" key={question.id}>
                  <h3>{question.title}</h3>
                  <form key={question.id}>
                    {question.choices.map((choiceId) => {
                      const choice = choicesData[choiceId];
                      return (
                        <fieldset key={choice.id}>
                          <label htmlFor={question.id}>
                            {choice.value}
                            <input
                              type="radio"
                              name={question.id}
                              value={choice.value}
                              id={question.id}
                            />
                          </label>
                        </fieldset>
                      );
                    })}

                    <input id="submitQ1" className="submit" type="submit" value="Submit" />
                  </form>
                </section>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Quiz.propTypes = {
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
};

Quiz.defaultProps = {
  questionsList: [],
  questionsData: {},
  choicesData: {},
  quiz: {},
};

export default container(Quiz);
