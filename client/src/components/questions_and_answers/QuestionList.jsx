import React from 'react';
import Question from './Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let sortedQuestions = this.props.questions.sort(sortByHelpfulness);
    if (this.props.searching) {
      sortedQuestions = this.props.searchedQuestions.sort(sortByHelpfulness);
    }
    let displayList = sortedQuestions.slice(0, this.props.questionNumbers);

    return (
      <div>
        {displayList.map((question) => (
          <Question question={question} answers={question.answers} key={question.question_id}/>
        ))}
      </div>
    );
  }
}

export default QuestionList;

const sortByHelpfulness = (a, b) => {
  if (a.question_helpfulness < b.question_helpfulness) {
    return 1;
  } else if (a.question_helpfulness > b.question_helpfulness) {
    return -1;
  } else {
    return 0;
  }
};

var buttonStyle = {
  fontSize: '12px',
  display: 'grid',
  margin: '10px 0px'
};