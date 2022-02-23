import React from 'react';
import Question from './Question.jsx';

const QuestionList = (props) => {

  let sortedQuestions = props.questions.sort(sortByHelpfulness);
  if (props.searching) {
    sortedQuestions = props.searchedQuestions.sort(sortByHelpfulness);
  }
  let displayList = sortedQuestions.slice(0, props.questionNumbers);

  return (
    <div id='question-list'>
      {displayList.map((question) => (
        <Question
          question={question}
          productName = {props.productName}
          key={question.question_id}
        />
      ))}
    </div>
  );
};

export default QuestionList;

const sortByHelpfulness = (a, b) => {
  return b.question_helpfulness - a.question_helpfulness;
};