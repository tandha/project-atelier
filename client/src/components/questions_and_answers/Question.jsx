import React from 'react';
import axios from 'axios';
import AnswerModal from './ModalForm/AnswerModal.jsx';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionHelpful: false,
      answers: Object.values(this.props.question.answers),
      answerNumbers: 2,
      showAnswerModal: false
    };

    this.renderQuestionHelpfulBtn = this.renderQuestionHelpfulBtn.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.renderMoreAnswersBtn = this.renderMoreAnswersBtn.bind(this);
    this.clickMoreAnswers = this.clickMoreAnswers.bind(this);
    this.clickAddAnswer = this.clickAddAnswer.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  renderQuestionHelpfulBtn() {
    if (this.state.QuestionHelpful) {
      return ( <button id='question-helpful' disabled> Yes ({this.props.question.question_helpfulness + 1}) </button> );
    } else {
      return ( <button id='question-helpful' onClick={this.markQuestionHelpful}> Yes ({this.props.question.question_helpfulness}) </button> );
    }
  }

  markQuestionHelpful() {
    axios({
      method: 'put',
      url: `/qa/questions/${this.props.question.question_id}/helpful`,
      params: {'question_id': this.props.question.question_id}
    }).then(()=> {
      this.setState({ QuestionHelpful: true });
    }).catch((err)=> {
      console.log('error marking question helpful', err);
    });
  }

  renderMoreAnswersBtn() {
    if (this.state.answers.length > 2) {
      if (this.state.answerNumbers < this.state.answers.length) {
        return ( <div id='load-more-answer' onClick={this.clickMoreAnswers}> LOAD MORE ANSWERS </div> );
      } else {
        return ( <div id='collapse-answer' onClick={this.clickMoreAnswers}> COLLAPSE ANSWERS </div> );
      }
    }
  }

  clickMoreAnswers() {
    if (this.state.answerNumbers < this.state.answers.length) {
      this.setState({ answerNumbers: this.state.answers.length });
    } else {
      this.setState({ answerNumbers: 2 });
    }
  }

  clickAddAnswer() {
    this.setState(prevState => ({showAnswerModal: !prevState.showAnswerModal}));
  }

  submitAnswer(e) {
    e.preventDefault();
    var body = document.getElementById('answer-body').value;
    var nickname = document.getElementById('answer-nickname').value;
    var email = document.getElementById('answer-email').value;

    // to do: axios post request to API
  }

  render() {
    return (
      <div id='each-question'>
        <div id='question-body'> Q: {this.props.question.question_body} </div>
        <div id='question-interaction'>
          Helpful? {this.renderQuestionHelpfulBtn()} |
          <button id='add-answer' onClick={this.clickAddAnswer}>Add Answer</button>
        </div>
        <AnswerModal
          clickAddAnswer = {this.clickAddAnswer}
          submitAnswer = {this.submitAnswer}
          productName = {this.props.productName}
          question = {this.props.question}
          showAnswerModal = {this.state.showAnswerModal}
        />
        <AnswerList
          answers={this.state.answers}
          answerNumbers={this.state.answerNumbers}
        />
        {this.renderMoreAnswersBtn()}
      </div>
    );
  }
}

export default Question;