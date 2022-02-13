import React from 'react';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let displayList = this.props.questions.slice(0, 2);
    if (this.props.searching) {
      displayList = this.props.searchedQuestions.slice(0, 2);
    }

    return (
      <div>
        {displayList.map((question) => (
          <Question question={question} answers={question.answers} key={question.question_id}/>
        ))}
        <div style={buttonStyle}>
          <b>LOAD MORE ANSWERS</b>
        </div>
      </div>
    );
  }
}

export default QuestionList;

var buttonStyle = {
  fontSize: '12px',
  display: 'grid',
  margin: '10px 0px'
};