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
      return ( <button style={buttonStyle}> Yes ({this.props.question.question_helpfulness + 1}) </button> );
    } else {
      return ( <button style={smallStyle} onClick={this.markQuestionHelpful}> Yes ({this.props.question.question_helpfulness}) </button> );
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
        return (
          <div style={{display: 'grid', fontSize: '12px', marginLeft: '22px'}} onClick={this.clickMoreAnswers}>
            <b>LOAD MORE ANSWERS</b>
          </div>
        );
      } else {
        return (
          <div style={{display: 'grid', fontSize: '12px', marginLeft: '22px'}} onClick={this.clickMoreAnswers}>
            <b>COLLAPSE ANSWERS</b>
          </div>
        );
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
    // validate the questions

    // axios({
    //   method: 'post',
    //   url: `/qa/questions/${this.props.question.question_id}/answers`,
    //   params: {'question_id': this.props.question.question_id}
    //   data: {
    //     body: e.target[0].value,
    //     name: e.target[1].value,
    //     email: e.target[2].value,
    //     photos:[]
    //   }
    // }).then(()=> {
    //   this.setState({ showAnswerModal: false });
    // }).catch((err)=> {
    //   console.log('error adding answer', err);
    // });
  }

  render() {
    return (
      <div>
        <div style={QAstyle}> Q: {this.props.question.question_body} </div>
        <div style={smallStyle}>
          Helpful? {this.renderQuestionHelpfulBtn()} |
          <button style={smallStyle} onClick={this.clickAddAnswer}>Add Answer</button>
        </div>
        <AnswerModal
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

var QAstyle = {
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-grid',
  width: '50%'
};

var smallStyle = {
  width: '10%',
  background: 'none',
  border: 'none',
  // padding: '5px',
  fontSize: '12px',
  display: 'inline',
  color: 'grey'
};

var buttonStyle = {
  width: '10%',
  fontWeight: 'bold',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  // padding: '5px',
  fontSize: '12px',
  display: 'inline',
  color: 'grey'
};