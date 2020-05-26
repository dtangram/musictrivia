import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionsContainer extends React.Component {
    // the default state
    state = {
      questions: {},
    }

    fetchQuestions = async (id) => {
      // get the details of the questions
      const questions = await API.get(`/questions/${id}`);
      // get the choicess for this questions
      const choicess = await API.get(`/choicess?questionsId=${id}`);
      this.setState({ questions, choicess });
    }

    saveQuestions = async (questions) => {
      if (questions.id) {
        return API.put(`/questions/${questions.id}`, questions);
      }
      return API.post('/questions', questions);
    }

    save = async (event) => {
      // don't actually submit the form through the browser
      event.preventDefault();
    }

    deleteQuestions = async (id) => {
      await API.delete(`/questions/${id}`);
    }

    render() {
      const { questions, choicess } = this.state;
      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          questions={questions}
          choicess={choicess}
          fetchQuestions={this.fetchQuestions}
          saveQuestions={this.saveQuestions}
          deleteDecision={this.deleteQuestions}
        />
      );
    }
  };
}
