import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizSingleContainer extends React.Component {
    // the default state
    state = {
      quizSingle: {},
      questions: [],
      choices: [],
    }

    fetchQuizSingle = async (id) => {
      // get the details of the quizSingle
      const quizSingle = await API.get(`/quizSingle/${id}`);
      // get the choices for this quizSingle
      const choices = await API.get(`/choices?quizSingleId=${id}`);
      this.setState({ quizSingle, choices });
    }

    saveQuizSingle = async (quizSingle) => {
      if (quizSingle.id) {
        return API.put(`/quizSingle/${quizSingle.id}`, quizSingle);
      }
      return API.post('/quizSingle', quizSingle);
    }

    save = async (event) => {
      // don't actually submit the form through the browser
      event.preventDefault();
    }

    deleteQuizSingle = async (id) => {
      await API.delete(`/quizSingle/${id}`);
    }

    render() {
      const { quizSingle, choices } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          quizSingle={quizSingle}
          choices={choices}
          fetchQuizSingle={this.fetchQuizSingle}
          saveQuizSingle={this.saveQuizSingle}
          deleteDecision={this.deleteQuizSingle}
        />
      );
    }
  };
}
