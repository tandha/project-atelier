import React from 'react';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <div>
        {this.props.questions.map((question) => (
          <Question question={question} key={question.question_id}/>
        ))}
        <div>
          <button> LOAD MORE ANSWERS </button>
        </div>
      </div>
    );
  }
}

export default QuestionList;