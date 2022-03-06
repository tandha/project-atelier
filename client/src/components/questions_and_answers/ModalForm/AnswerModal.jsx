import React from 'react';
import axios from 'axios';
import {IoIosCloseCircleOutline} from 'react-icons/io';
// import config from '../../../../../.env';

// const IMG_KEY = process.env.REACT_APP_IMG_KEY;

const AnswerModal = (props) => {
  if (props.showAnswerModal === false) {
    return null;
  }
  return (
    <div id='new-answer-modal'>
      <div id='new-answer-content'>
        <h2 className='QA-form-head'>Submit your Answer</h2>
        <button className='QA-close-btn' onClick={props.clickAddAnswer}><IoIosCloseCircleOutline/></button>
        <h3>{props.productName}: {props.question.question_body}</h3>
        <form id='submit-answer-form' onSubmit={props.submitAnswer}>
          <p className='QA-note'>*mandatory area</p>
          <p>Your Answer?*</p>
          <textarea id='answer-body' rows='5' cols='50' maxLength='1000' required></textarea>
          <p>What is your nickname?*</p>
          <input id='answer-nickname' type='text' size='61' placeholder='Example: jackson543!' maxLength='60' required></input>
          <p className='QA-note'>For privacy reasons, do not use your full name or email address</p>
          <p>Your email?*</p>
          <input id='answer-email' type='email' size='61' placeholder='jack@email.com' maxLength='60' required></input>
          <p className='QA-note'>For authentication reasons, you will not be emailed</p>
          <p>Upload your photos</p>
          <input id='upload-answer-photo' type='file' accept='image/*' multiple onChange={(e) => uploadFile(e)}></input>
          <div id='QA-preview-container'></div>
          <button className='QA-submit-btn' type='submit'>Submit Answer</button>
        </form>

      </div>
    </div>
  );
};

export default AnswerModal;

const uploadFile = (e) => {
  const container = document.querySelector('#QA-preview-container');
  const file = e.target.files[0];
  const reader = new FileReader();
  const img = new Image();

  reader.onload = (e) => {
    const body = e.target.result.split(',')[1];
    const bodyFormData = new FormData();
    bodyFormData.append('image', body);

    axios({
      headers: { 'content-type': 'multipart/form-data' },
      method: 'post',
      url: `https://api.imgbb.com/1/upload?key=${config.IMG_KEY}`,
      data: bodyFormData
    }).then((res) => {
      img.src = res.data.data.url;
    }).catch((err)=> {
      console.log('err getting img url', err);
    });

    img.className = 'QA-preview';
    img.height = 100;
    container.appendChild(img);
  };
  if (file) {
    reader.readAsDataURL(file);
  }
  if (container.childElementCount >= 4) {
    document.querySelector('#upload-answer-photo').style.visibility = 'hidden';
  }
};
