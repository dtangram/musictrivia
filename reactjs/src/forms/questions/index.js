import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import '../../css/main.css';
import container from './container';

class QuestionsForm extends React.Component {
  state = {
    title: undefined,
  }

  componentDidMount() {
    const { fetchQuestion, match: { params: { id } } } = this.props;
    if (id) fetchQuestion(id);

    this.loadData();
    this.inputFocus.focus();
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the even object
    const { target: { name, value } } = event;
    // update the state to a key of the name of the input and value of the value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  }

  // save = async (event) => {
  //   event.preventDefault();
  //   const {
  //     questions: { id }, saveQuestions, history, location,
  //   } = this.props;
  //
  //   const { title } = this.state;
  //   // get the query params from the url
  //   const queryParams = new URLSearchParams(location.search);
  //   // get the questionId from query params
  //   const questionId = queryParams.get('questionId');
  //   await saveQuestions({ id, questionId, title });
  //   history.push(`/admin/questions/${id}`);
  // }

  loadData = async () => {
    const {
      match: {
        params: { id },
      },
      fetchQuestion,
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchQuestion(id);
    // update the state with the data from the updated item
    const { question } = this.props;
    this.setState({ ...question });
  };

  save = (event) => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createQuestion,
      updateQuestion,
      match: {
        params: { quizId, id },
      },
      history,
    } = this.props;
    const { title } = this.state;

    if (id) {
      updateQuestion({
        id,
        title,
      }).then(() => history.push(`/admin/quizzes/detail/${quizId}`));
    } else {
      createQuestion({
        title, quizId,
      }).then(() => history.push(`/admin/quizzes/detail/${quizId}`));
    }
  };

  render() {
    const {
      question: {
        // rename name prop to "defaultTitle"
        title: defaultTitle = '',
      },

      match: {
        params: { id },
      },
    } = this.props;

    const {
      // get the name from the state and if it doesn't exist use the prop
      title = defaultTitle,
    } = this.state;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <div id="questionsCreate">
            <section className="wrapper wrapperOne">
              <h2>
                {id && (
                  `Edit ${title}`
                )}

                {!id && (
                  'Create a Question'
                )}

              </h2>

              <form method="POST" onSubmit={this.save}>
                <fieldset>
                  <label htmlFor="title">
                    Question Title

                    <input
                      ref={(input) => { this.inputFocus = input; }}
                      id="title"
                      type="text"
                      name="title"
                      value={title}
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
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

QuestionsForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  createQuestion: PropTypes.func.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionsForm.defaultProps = {
  question: {},
};

export default container(QuestionsForm);
