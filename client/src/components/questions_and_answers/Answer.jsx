import React from 'react';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AnswerHelpful: false,
      reported: false
    };
    this.renderAnswerHelpfulBtn = this.renderAnswerHelpfulBtn.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.renderReportBtn = this.renderReportBtn.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  renderAnswerHelpfulBtn() {
    if (this.state.AnswerHelpful) {
      return ( <button role="help" disabled={true} style={buttonStyle}> Yes ({this.props.answer.helpfulness + 1}) </button> );
    } else {
      return ( <button role="help" style={smallStyle} onClick={this.markAnswerHelpful}> Yes ({this.props.answer.helpfulness}) </button> );
    }
  }

  markAnswerHelpful() {
    axios({
      method: 'put',
      url: `/qa/answers/${this.props.answer.id}/helpful`,
      params: {'answer_id': this.props.answer.id}
    }).then(()=> {
      this.setState({ AnswerHelpful: true });
    }).catch((err)=> {
      console.log('error marking answer helpful', err);
    });
  }

  renderReportBtn() {
    if (this.state.reported) {
      return ( <button role="report" disabled={true} style={buttonStyle}> Reported </button> );
    } else {
      return ( <button role="report" style={smallStyle} onClick={this.reportAnswer}> Report </button> );
    }
  }

  reportAnswer() {
    axios({
      method: 'put',
      url: `/qa/answers/${this.props.answer.id}/report`,
      params: {'answer_id': this.props.answer.id}
    }).then(()=> {
      this.setState({ reported: true });
    }).catch((err)=> {
      console.log('error reporting answer', err);
    });
  }

  render() {
    return (
      <div>
        <div> {this.props.answer.body} </div>
        {/* <div> {this.props.answer.photos[0]} </div> */}
        <div style={smallStyle}>
          by {this.props.answer.answerer_name}, {renderDate(this.props.answer.date.toString())} | Helpful?
          {this.renderAnswerHelpfulBtn()}
          | {this.renderReportBtn()}
        </div>
      </div>
    );
  }
}

export default Answer;

const renderDate = (string) => {
  const date = new Date(string);
  const render = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'long' }).format(date);
  return render.split(',')[0];
};

var smallStyle = {
  background: 'none',
  border: 'none',
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