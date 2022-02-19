import React from 'react';

const QuestionModal = (props) => {
  if (props.showQuestionModal === false) {
    return null;
  }
  return (
    <div>
      <form onSubmit={props.submitQuestions}>
        <h2>Ask Your Question</h2>
        <h3>About the {props.productName}</h3>
        <p>Your Question?*</p>
        <textarea name="question" rows="5" cols="100" maxLength="1000"></textarea>
        <p>What is your nickname?*</p>
        <textarea name="nickname" rows="2" cols="50" placeholder="Example: jackson11!" maxLength="60"></textarea>
        <p style={{ color: 'gray' }}>For privacy reasons, do not use your full name or email address</p>
        <p>Your email?*</p>
        <textarea name="email" rows="2" cols="50" placeholder="Why did you like the product or not?" maxLength="60"></textarea>
        <p style={{ color: 'gray' }}>For authentication reasons, you will not be emailed</p>
        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default QuestionModal;