import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import '../../css/main.css';
import QuizFormContainer from './container';

class QuizzesForm extends React.Component {
  state = {
    name: undefined,
    type: 'private',
  }

  componentDidMount() {
    // get the id from the route params
    const { fetchQuiz, match: { params: { id } } } = this.props;
    if (id) fetchQuiz(id);

    this.loadData();

    // this.inputFocus = React.createRef();
    // this.inputFocus.focus();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.inputFocus.focus();
  // }

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
      fetchQuiz,
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchQuiz(id);
    // update the state with the data from the updated item
    const { quiz } = this.props;
    this.setState({ ...quiz });
  };

  save = (event) => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createQuiz,
      updateQuiz,
      match: {
        params: { id },
      },
      history,
    } = this.props;
    const { name, type } = this.state;

    const userId = localStorage.getItem('id');

    if (id) {
      updateQuiz({
        id,
        name,
        type,
      }).then(() => {
        if (type === 'public') {
          history.push(`/admin/quizzes/publicQuiz/${userId}`);
        } else if (type === 'private') {
          history.push(`/admin/quizzes/privateQuiz/${userId}`);
        }
      });
    } else {
      createQuiz({
        name,
        type,
        userId,
      }).then(() => {
        if (type === 'public') {
          history.push(`/admin/quizzes/publicQuiz/${userId}`);
        } else if (type === 'private') {
          history.push(`/admin/quizzes/privateQuiz/${userId}`);
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
      quiz: {
        // rename name prop to "defaultTitle"
        name: defaultName = '',
      },

      match: {
        params: { id },
      },
    } = this.props;

    const {
      // get the name from the state and if it doesn't exist use the prop
      name = defaultName,
      // get the type from the state and if it doesn't exist use the prop
      type,
    } = this.state;

    const userId = localStorage.getItem('id');
    if (!userId) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <div id="quizsCreate">
            <section className="wrapper wrapperOne">
              <h2>
                {id && (
                  `Edit ${name} Quiz`
                )}

                {!id && (
                  'Create a Quiz'
                )}
              </h2>

              <form method="POST" onSubmit={this.save}>
                <fieldset>
                  <label htmlFor="name">
                    Quiz Name

                    <input
                      // ref={(input) => { this.inputFocus = input; }}
                      id="name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </label>
                </fieldset>

                <fieldset>
                  <label className="labelRadio" htmlFor="private">
                    Private Quiz

                    <input
                      type="radio"
                      value="private"
                      name="type"
                      checked={type === 'private'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </label>

                  <label className="labelRadio" htmlFor="public">
                    Public Quiz

                    <input
                      type="radio"
                      value="public"
                      name="type"
                      checked={type === 'public'}
                      onChange={this.handleChange.bind(this)}
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

QuizzesForm.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  createQuiz: PropTypes.func.isRequired,
  updateQuiz: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuizzesForm.defaultProps = {
  quiz: {},
};

export default QuizFormContainer(QuizzesForm);
