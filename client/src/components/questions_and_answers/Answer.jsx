import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ahelped: false,
      reported: false
    };
    this.renderAnswerHelpfulBtn = this.renderAnswerHelpfulBtn.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.renderReportBtn = this.renderReportBtn.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  renderAnswerHelpfulBtn() {
    if (this.state.Ahelped) {
      return ( <button style={buttonStyle}> Helpful </button> );
    } else {
      return ( <button style={smallStyle} onClick={this.markAnswerHelpful}> Yes </button> );
    }
  }

  markAnswerHelpful() {
    this.setState({ Ahelped: true });
    // axios put
  }

  renderReportBtn() {
    if (this.state.reported) {
      return ( <button style={buttonStyle}> Reported </button> );
    } else {
      return ( <button style={smallStyle} onClick={this.reportAnswer}> Report </button> );
    }
  }

  reportAnswer() {
    this.setState({ reported: true });
    // axios put
  }

  render() {
    const date = new Date(this.props.answer.date.toString());
    const renderDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'long' }).format(date);
    return (
      <div>
        <div><b>A:</b> {this.props.answer.body} </div>
        <div style={smallStyle}>
          by {this.props.answer.answerer_name}, {renderDate} | Helpful?
          {this.renderAnswerHelpfulBtn()}
          | {this.renderReportBtn()}
        </div>
      </div>
    );
  }
}

export default Answer;

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