import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const AnswerModal = (props) => {
  if (props.showAnswerModal === false) {
    return null;
  }
  return (
    <div id='new-answer-modal'>
      <div id='new-answer-content'>
        <h2 id='QA-form-head'>Submit your Answer</h2>
        <button id='QA-close-btn' onClick={props.clickAddAnswer}><IoIosCloseCircleOutline/></button>
        <h3>{props.productName}: {props.question.question_body}</h3>

        <form id='submit-answer-form' onSubmit={props.submitAnswer}>
          <p id='QA-note'>*mandatory area</p>
          <p>Your Answer?*</p>
          <textarea id='answer-body' rows='5' cols='50' maxLength='1000' required></textarea>
          <p>What is your nickname?*</p>
          <input id='answer-nickname' type='text' size='61' placeholder='Example: jackson543!' maxLength='60' required></input>
          <p id='QA-note'>For privacy reasons, do not use your full name or email address</p>
          <p>Your email?*</p>
          <input id='answer-email' type='email' size='61' placeholder='jack@email.com' maxLength='60' required></input>
          <p id='QA-note'>For authentication reasons, you will not be emailed</p>
          <p>Upload your photos</p>
          <button id='QA-submit-btn' type='submit'>Submit Answer</button>
        </form>

      </div>
    </div>
  );
};

export default AnswerModal;