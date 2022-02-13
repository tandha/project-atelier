import React from 'react';
import Answer from './Answer.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let displayList = this.props.answers.slice(0, 2);

    return (
      <div>
        {displayList.map((answer) => (
          <Answer answer={answer} key={answer.id}/>
        ))}
      </div>
    );
  }
}

export default QuestionList;

var QAstyle = {
  fontWeight: '600',
  fontSize: '16px',
  display: 'inline-grid',
  width: '50%'
};