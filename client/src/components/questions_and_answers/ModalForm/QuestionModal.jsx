import React from 'react';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const QuestionModal = (props) => {
  if (props.showQuestionModal === false) {
    return null;
  }
  return (
    <div id='new-question-modal'>
      <div id='new-question-content'>
        <h2 id='form-head'>Ask Your Question</h2>
        <button id='close-button' onClick={props.clickAddQuestion}><IoIosCloseCircleOutline/></button>
        <h3>About the {props.productName}</h3>

        <form id='submit-question-form' onSubmit={props.submitQuestion}>
          <p id='QA-note'>* mandatory area</p>
          <p>Your Question?*</p>
          <textarea id='your-question' rows='5' cols='50' maxLength='1000' required></textarea>
          <p>What is your nickname?*</p>
          <textarea id='question-nickname' rows='2' cols='50' placeholder='Example: jackson11!' maxLength='60' required></textarea>
          <p id='QA-note'>For privacy reasons, do not use your full name or email address</p>
          <p>Your email?*</p>
          <textarea id='question-email' type='email' pattern='.+@email\.com' rows='2' cols='50'
            placeholder='Why did you like the product or not?' maxLength='60' required></textarea>
          <p id='QA-note'>For authentication reasons, you will not be emailed</p>
          <button id='submit-btn' type='submit'>Submit Question</button>
        </form>

      </div>
    </div>
  );
};

export default QuestionModal;