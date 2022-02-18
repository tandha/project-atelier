import React from 'react';
import Answer from './Answer.jsx';

const AnswerList = (props) => {
  let answerBySeller = [];
  let answerByOther = [];
  props.answers.forEach((answer) => {
    return answer.answerer_name === 'Seller' ? answerBySeller.push(answer) : answerByOther.push(answer);
  });

  let sortedAnswersByOther = answerByOther.sort(sortByHelpfulness);
  let displayList = answerBySeller.concat(sortedAnswersByOther).slice(0, props.answerNumbers);

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
};

export default AnswerList;

const sortByHelpfulness = (a, b) => {
  return b.helpfulness - a.helpfulness;
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