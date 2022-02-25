import React from 'react';
import axios from 'axios';
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
          <input id='upload-answer-photo' type='file' accept='image/png, image/jpeg' multiple onChange={() => previewFile()}></input>
          <div id='QA-preview-container'></div>
          <button id='QA-submit-btn' type='submit'>Submit Answer</button>
        </form>

      </div>
    </div>
  );
};

export default AnswerModal;

const previewFile = () => {
  const container = document.querySelector('#QA-preview-container');
  const file = document.querySelector('#upload-answer-photo').files[0];
  const reader = new FileReader();
  const img = new Image();

  reader.addEventListener('load', () => {
    // todo: axios request to imgBB

    img.id = 'QA-preview';
    img.src = reader.result;
    img.height = 100;
    container.appendChild(img);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
  if (container.childElementCount >= 4) {
    document.querySelector('#upload-answer-photo').style.visibility = 'hidden';
  }
};