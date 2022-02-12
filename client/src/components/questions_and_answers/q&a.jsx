import React from 'react';
import axios from 'axios';
import {exampleQuestions} from './exampleData.js';
import SearchBar from './SearchBar.jsx';
import QuestionList from './QuestionList.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: exampleQuestions.results, // an array
      displayQuestions: []
    };
    this.getProductQuestions = this.getProductQuestions.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearchQuestions = this.handleSearchQuestions.bind(this);
  }

  componentDidMount() {
    this.getProductQuestions();
  }

  getProductQuestions() {
    // axios get from API '/questions/:id'
  }

  handleSearchBar(e) {
    if (e.target.value.length > 2) {
      this.setState({
        searching: true,
        displayQuestions: this.handleSearchQuestions(e.target.value)
      });
    } else {
      this.setState({ searching: false});
    }
  }

  handleSearchQuestions(term) {
    const filtered = this.state.questions.filter((question) => {
      let qBody = question.question_body.toLowerCase();
      return qBody.includes(term);
    });
    return filtered;
  }


  render() {
    return (
      <div>
        <SearchBar handleSearchBar={this.handleSearchBar}/>
        <QuestionList questions={this.state.questions}/>
        <button> MORE ANSWERED QUESTIONS </button>
        <button> ADD A QUESTION + </button>
      </div>
    );
  }
}

export default QuestionsAndAnswers;