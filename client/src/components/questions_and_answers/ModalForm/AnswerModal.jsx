import React from 'react';

const AnswerModal = (props) => {
  if (props.showAnswerModal === false) {
    return null;
  }
  return (
    <div>
      <form onSubmit={props.submitAnswer}>
        <h2>Submit your Answer</h2>
        <h3>{props.productName}:{props.question.question_body}</h3>
        <p>Your Answer?*</p>
        <textarea name="answer" rows="5" cols="100" maxLength="1000"></textarea>
        <p>What is your nickname?*</p>
        <textarea name="nickname" rows="2" cols="50" placeholder="Example: jackson543!" maxLength="60"></textarea>
        <p style={{ color: 'gray' }}>For privacy reasons, do not use your full name or email address</p>
        <p>Your email?*</p>
        <textarea name="email" rows="2" cols="50" placeholder="jack@email.com?" maxLength="60"></textarea>
        <p style={{ color: 'gray' }}>For authentication reasons, you will not be emailed</p>
        {/* <button>Upload your photo</button> */}
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
};

export default AnswerModal;