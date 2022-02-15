import React from 'react';
import Answer from './Answer.jsx';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let sortedAnswers = this.props.answers.sort(sortByHelpfulness);
    let displayList = sortedAnswers.slice(0, this.props.answerNumbers);

    return (
      <div>
        <div style={{display: 'inline-grid', fontWeight: 'bold'}}> A: </div>
        <div style={{display: 'inline-grid', marginLeft: '6px'}}>
          {displayList.map((answer) => (
            <Answer answer={answer} key={answer.id}/>
          ))}
        </div>
      </div>
    );
  }
}

export default AnswerList;

const sortByHelpfulness = (a, b) => {
  if (a.helpfulness < b.helpfulness) {
    return 1;
  } else if (a.helpfulness > b.helpfulness) {
    return -1;
  } else {
    return 0;
  }
};

var QAstyle = {
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-grid',
  width: '50%',
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