import React from 'react';
import AnswerList from './AnswerList.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionHelpful: false,
      answersId: Object.keys(this.props.answers) // an array
    };
    this.renderQuestionHelpfulBtn = this.renderQuestionHelpfulBtn.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
  }

  renderQuestionHelpfulBtn() {
    if (this.state.QuestionHelpful) {
      return ( <button style={buttonStyle}> Helpful </button> );
    } else {
      return ( <button style={smallStyle} onClick={this.markQuestionHelpful}> Yes </button> );
    }
  }

  markQuestionHelpful() {
    this.setState({ QuestionHelpful: true });
    // axios put
  }

  render() {
    const answersArr = Object.values(this.props.answers);

    return (
      <div>
        <div style={QAstyle}> Q: {this.props.question.question_body} </div>
        <div style={smallStyle}>
          Helpful?
          {this.renderQuestionHelpfulBtn()}
          | Add Answer
        </div>
        <AnswerList answers={answersArr}/>
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
  'text-decoration': 'underline',
  background: 'none',
  border: 'none',
  padding: '5px',
  fontSize: '12px',
  display: 'inline',
  color: 'grey'
};