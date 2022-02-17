import React from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionHelpful: false,
      answers: Object.values(this.props.question.answers),
      answerNumbers: 2
    };
    this.renderQuestionHelpfulBtn = this.renderQuestionHelpfulBtn.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.renderMoreAnswersBtn = this.renderMoreAnswersBtn.bind(this);
    this.clickMoreAnswers = this.clickMoreAnswers.bind(this);
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
      this.setState({
        answerNumbers: this.state.answers.length
      });
    } else {
      this.setState({
        answerNumbers: 2
      });
    }
  }

  render() {
    return (
      <div>
        <div style={QAstyle}> Q: {this.props.question.question_body} </div>
        <div style={smallStyle}>
          Helpful? {this.renderQuestionHelpfulBtn()} | Add Answer
        </div>
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
  background: 'none',
  border: 'none',
  padding: '5px',
  fontSize: '12px',
  display: 'inline',
  color: 'grey'
};

var buttonStyle = {
  fontWeight: 'bold',
  textDecoration: 'underline',
  background: 'none',
  border: 'none',
  padding: '5px',
  fontSize: '12px',
  display: 'inline',
  color: 'grey'
};