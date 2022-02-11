import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayQuestions: []
    };
    this.getProductQuestions = this.getProductQuestions.bind(this);
  }

  componentDidMount() {
    this.getProductQuestions();
  }

  getProductQuestions() {
    // axios get from API '/questions/:id'
  }


  render() {
    return (
      <div>
        <SearchBar displayQuestions={this.state.displayQuestions}/>
      </div>
    );
  }
}

export default QuestionsAndAnswers;