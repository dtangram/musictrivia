import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import '../../css/main.css';
import container from './container';

class ChoicesForm extends React.Component {
  state = {
    value: undefined,
  }

  componentDidMount() {
    const { fetchChoice, match: { params: { id } } } = this.props;
    if (id) fetchChoice(id);

    this.loadData();
    this.inputFocus.focus();
  }

  // componentDidMount() {
  //   const { fetchComicBook, match: { params: { coboTitleId } } } = this.props;
  //   if (coboTitleId) fetchComicBook(coboTitleId);
  //
  //   this.inputFocus.focus();
  // }

  // handleInputChange = (event) => {
  //   // pull the name of the input and value of input out of the even object
  //   const { target: { name, value } } = event;
  //   // update the state to a key of the name of the input and value of the value of the input
  //   // ex: type: 'private'
  //   this.setState({
  //     [name]: value,
  //   });
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
      fetchChoice,
    } = this.props;
    // if no id don't load the item
    if (!id) return;
    await fetchChoice(id);
    // update the state with the data from the updated item
    const { choice } = this.props;
    this.setState({ ...choice });
  };

  save = (event) => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createChoice,
      updateChoice,
      match: {
        params: { questionId, id },
      },
      // history,
    } = this.props;
    const {
      value, type,
    } = this.state;

    if (id) {
      updateChoice({
        id,
        value,
        type,
      });
    } else {
      createChoice({
        value,
        type,
        questionId,
      });
    }
  };

  handleChange(event) {
    this.setState({
      type: event.target.value,
    });
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      choice: {
        id,
        // rename value prop to "defaultTitle"
        value: defaultValue = '',
        type: defaultType = '',
      },
      history,
    } = this.props;

    const {
      // get the value from the state and if it doesn't exist use the prop
      value = defaultValue,
      type = defaultType,
    } = this.state;

    return (
      <React.Fragment>
        <div className="quizWrap">
          <div id="choicesCreate">
            <section className="wrapper wrapperOne">
              <h2>
                {id && (
                  `Edit ${value}`
                )}

                {!id && (
                  'Create a Choice'
                )}
              </h2>

              <button type="button" onClick={() => history.goBack()}>Back</button>

              <form method="POST" onSubmit={this.save}>
                <fieldset>
                  <p>Choice Name</p>

                  <input
                    ref={(input) => { this.inputFocus = input; }}
                    type="text"
                    name="value"
                    value={value}
                    onChange={this.handleInputChange.bind(this)}
                  />
                </fieldset>

                <fieldset>
                  <p>Choice Type</p>

                  <label className="labelRadio" htmlFor="correct">
                    Correct
                    <input
                      type="radio"
                      value="correct"
                      name="type"
                      checked={type === 'correct'}
                      onChange={this.handleChange.bind(this)}
                    />
                  </label>

                  <label className="labelRadio" htmlFor="incorrect">
                    Incorrect
                    <input
                      type="radio"
                      value="incorrect"
                      name="type"
                      checked={type === 'incorrect'}
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

ChoicesForm.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  }),

  createChoice: PropTypes.func.isRequired,
  updateChoice: PropTypes.func.isRequired,
  fetchChoice: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

ChoicesForm.defaultProps = {
  choice: {},
};

// export default ChoiceContainer(ChoicesForm);
export default container(ChoicesForm);
