import React from 'react';

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
      return ( <button style={buttonStyle}> Yes ({this.props.answer.helpfulness}) </button> );
    } else {
      return ( <button style={smallStyle} onClick={this.markAnswerHelpful}> Yes ({this.props.answer.helpfulness}) </button> );
    }
  }

  markAnswerHelpful() {
    this.setState({ AnswerHelpful: true });
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