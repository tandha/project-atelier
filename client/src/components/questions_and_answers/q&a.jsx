import React from 'react';
import axios from 'axios';
import {IoMdAdd} from 'react-icons/io';
import SearchBar from './SearchBar.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionModal from './ModalForm/QuestionModal.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionNumbers: 2,
      searching: false,
      searchedQuestions: [],
      showQuestionModal: false
    };
    this.getProductQuestions = this.getProductQuestions.bind(this);
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleSearchQuestions = this.handleSearchQuestions.bind(this);
    this.renderMoreQuestionBtn = this.renderMoreQuestionBtn.bind(this);
    this.clickMoreQuestions = this.clickMoreQuestions.bind(this);
    this.clickAddQuestion = this.clickAddQuestion.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  componentDidMount() {
    this.getProductQuestions();
  }

  getProductQuestions() {
    axios({
      method: 'get',
      url: 'qa/questions',
      params: {
        'product_id': this.props.product.id, //64624,
        count: 100
      }
    }).then((res)=> {
      this.setState({ questions: res.data.data.results });
    }).catch((err)=> {
      console.log('error getting questions', err);
    });
  }

  handleSearchBar(e) {
    if (e.target.value.length > 2) {
      this.setState({
        searching: true,
        searchedQuestions: this.handleSearchQuestions(e.target.value)
      });
    } else {
      this.setState({ searching: false});
    }
  }

  handleSearchQuestions(term) {
    const filtered = this.state.questions.filter((question) => {
      const qBody = question.question_body.toLowerCase();
      return qBody.includes(term.toLowerCase());
    });
    return filtered;
  }

  renderMoreQuestionBtn() {
    if (this.state.questions.length > 2 && this.state.questionNumbers < this.state.questions.length) {
      return ( <button id='more-question-btn' onClick={this.clickMoreQuestions}> MORE ANSWERED QUESTIONS </button> );
    }
  }

  clickMoreQuestions() {
    if (this.state.questionNumbers < this.state.questions.length) {
      this.setState({ questionNumbers: this.state.questionNumbers + 2 });
    }
  }

  clickAddQuestion() {
    this.setState(prevState => ({showQuestionModal: !prevState.showQuestionModal}));
  }

  submitQuestion(e) {
    e.preventDefault();
    var body = document.getElementById('your-question').value;
    var nickname = document.getElementById('question-nickname').value;
    var email = document.getElementById('question-email').value;

    axios({
      method: 'post',
      url: '/qa/questions',
      data: {
        body: body,
        name: nickname,
        email: email,
        'product_id': this.props.product.id
      }
    }).then(()=> {
      this.setState({ showQuestionModal: false }, this.getProductQuestions());
    }).catch((err)=> {
      console.log('error adding question', err);
    });
  }

  render() {
    return (
      <div id='QA-container'>
        <p>QUESTIONS & ANSWERS</p>
        <SearchBar handleSearchBar={this.handleSearchBar}/>
        <QuestionList
          questions={this.state.questions}
          questionNumbers={this.state.questionNumbers}
          searching={this.state.searching}
          searchedQuestions={this.state.searchedQuestions}
          productName = {this.props.product.name}
        />
        {this.renderMoreQuestionBtn()}
        <button id='add-question-btn' onClick={this.clickAddQuestion}> ADD A QUESTION <IoMdAdd/> </button>
        <QuestionModal
          clickAddQuestion = {this.clickAddQuestion}
          submitQuestion = {this.submitQuestion}
          productName = {this.props.product.name}
          showQuestionModal = {this.state.showQuestionModal}
        />
      </div>
    );
  }
}

export default QuestionsAndAnswers;