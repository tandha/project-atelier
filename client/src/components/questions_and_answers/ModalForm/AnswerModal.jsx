import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const AnswerModal = (props) => {
  if (props.showAnswerModal === false) {
    return null;
  }
  return (
    <div id='new-answer-modal'>
      <div id='new-answer-content'>
        <button id='close-button' onClick={props.clickAddAnswer}><IoIosCloseCircleOutline/></button>
        <h2>Submit your Answer</h2>
        <h3>{props.productName}: {props.question.question_body}</h3>
        <form id='submit-answer-form' onSubmit={props.submitAnswer}>
          <p id='QA-note'>*mandatory area</p>
          <p>Your Answer?*</p>
          <textarea name="answer" rows="5" cols="50" maxLength="1000" required></textarea>
          <p>What is your nickname?*</p>
          <textarea name="nickname" rows="2" cols="50" placeholder="Example: jackson543!" maxLength="60" required></textarea>
          <p id='QA-note'>For privacy reasons, do not use your full name or email address</p>
          <p>Your email?*</p>
          <textarea name="email" rows="2" cols="50" placeholder="jack@email.com" maxLength="60" required></textarea>
          <p id='QA-note'>For authentication reasons, you will not be emailed</p>
          {/* <button>Upload your photo</button> */}
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;