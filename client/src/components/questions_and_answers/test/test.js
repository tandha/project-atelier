import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime.js';
const request = require('supertest');
const { API_URL, API_KEY } = require('../../../../../server/config.js');
import axios from 'axios';
axios.defaults.baseURL = API_URL;

import {exampleQuestions} from './exampleData.js';
import QuestionsAndAnswers from '../q&a.jsx';
import SearchBar from '../SearchBar.jsx';
import QuestionList from '../QuestionList.jsx';
import Question from '../Question.jsx';
import AnswerList from '../AnswerList.jsx';
import Answer from '../Answer.jsx';
import AnswerPhoto from '../AnswerPhoto.jsx';
import QuestionModal from '../ModalForm/QuestionModal.jsx';
import AnswerModal from '../ModalForm/AnswerModal.jsx';

/**
 * Render tests
 */
describe('Q&A render tests', () => {
  var props = {};

  beforeEach(() => {
    props = {
      productID: exampleQuestions.product.id,
      productName: exampleQuestions.product.name,
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
  });

  afterEach(cleanup);

  test('render Q&A main page', () => {
    render(<QuestionsAndAnswers {...props}/>);
  });

  test('render searchBar component', () => {
    render(<SearchBar/>);
  });

  test('render QuestionList component', () => {
    render(<QuestionList {...props}/>);
  });

  test('render Question component', () => {
    render(<Question question={props.questions[1]}/>);
  });

  test('render AnswerList component', () => {
    const answerArray = Object.values(props.questions[1].answers);
    render(<AnswerList answers={answerArray} answerNumbers={answerArray.length}/>);
  });

  test('render Answer component', () => {
    const answerArray = Object.values(props.questions[1].answers);
    render(<Answer answer={answerArray[0]}/>);
  });

  test('render Answer photo form component', () => {
    const answerArray = Object.values(props.questions[2].answers);
    const photo = answerArray[0].photos[0];
    render(<AnswerPhoto photo={photo}/>);
  });

  test('render Question modal component', () => {
    render(<QuestionModal productName={props.productName}/>);
  });

  test('render Anwer modal form component', () => {
    render(<AnswerModal productName={props.productName} question={props.questions[1]}/>);
  });
});


// describe('Test on widget features', () => {

//   var props = {};

//   beforeEach(() => {
//     props = {
//       productID: exampleQuestions.product.id,
//       productName: exampleQuestions.product.name,
//       product: exampleQuestions.product,
//       questions: exampleQuestions.results
//     };
//   });

//   afterEach(cleanup);

//   test('render Q&A main page', () => {
//     render(<QuestionsAndAnswers {...props}/>);

//     // test on first render of data
//   });

//   test('render searchBar component', () => {
//     render(<SearchBar/>);

//     // test on search event
//     const searchBar = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
//   });

//   test('render QuestionList component', () => {
//     render(<QuestionList questions={props.questions}/>);

//     // test on click more questions event
//   });

//   test('render Question component', () => {
//     render(<Question question={props.questions[1]}/>);

//     // test on sort by helpfulness
//     // test on click helpful event
//     // test on click more answers event
//   });

//   test('render AnswerList component', () => {
//     const answerArray = Object.values(props.questions[1].answers);
//     render(<AnswerList answers={answerArray} answerNumbers={answerArray.length}/>);
//   });

//   test('render Answer component', () => {
//     const answerArray = Object.values(props.questions[1].answers);
//     render(<Answer answer={answerArray[0]}/>);

//     // test on sort by helpfulness

//     // test on click helpful event
//     // const helpfulBtn = screen.getByRole('help');
//     // expect(helpfulBtn).not.toBeDisabled();
//     // fireEvent.click(helpfulBtn);
//     // expect(helpfulBtn).toBeDisabled();

//     // test on click report event
//   });

//   test('render Answer photo component', () => {
//     render(<QuestionModal productName={props.productName}/>);
//   });

//   test('render Question modal form component', () => {
//     const answerArray = Object.values(props.questions[2].answers);
//     const photo = answerArray[0].photos[0];
//     render(<AnswerPhoto photo={photo}/>);
//   });

// });


/**
 * Test on End points
 */

describe('Test on API end points', () => {

  let testProductID = 64622;
  let testQuestionID = 573794;

  afterEach(cleanup);

  test('should get questions from API', async () => {
    const result = await request(API_URL)
      .get('/qa/questions')
      .set('Authorization', API_KEY)
      .query({'product_id': testProductID, count: 100})
      .catch((err) => console.log('err on GET', err));

    expect(result.status).toBe(200);
    expect(typeof result.body).toBe('object');
    expect(Array.isArray(result.body.results)).toBe(true);
  });

  test('should post questions to API ', async () => {
    let data = {
      'body': 'I have a question',
      'name': 'tobi',
      'email': 'tobi@gmail.com',
      'product_id': testProductID
    };

    const postResult = await request(API_URL)
      .post('/qa/questions')
      .set('Authorization', API_KEY)
      .send(data)
      .catch((err) => console.log('err on POST questions', err));

    const getresult = await request(API_URL)
      .get('/qa/questions')
      .set('Authorization', API_KEY)
      .query({'product_id': data.product_id, count: 100})
      .catch((err) => console.log('err on GET', err));

    expect(postResult.status).toBe(201);
    expect(getresult.status).toBe(200);

    let result = getresult.body.results;
    let newQuestion = {};
    for (var i = 0; i < result.length; i++) {
      if (result[i].asker_name === data.name) {
        newQuestion = result[i];
      }
    }
    expect(newQuestion.question_body).toContain(data.body);
    expect(newQuestion.asker_name).toContain(data.name);
  });


  test('should post answers to API ', async () => {
    let data = {
      'body': 'I am not sure',
      'name': 'tobi',
      'email': 'tobi@gmail.com',
      'photos': []
    };

    const result = await request(API_URL)
      .post(`/qa/questions/${testQuestionID}/answers`)
      .set('Authorization', API_KEY)
      .send(data)
      .catch((err) => console.log('err on POST answers', err));

    expect(result.status).toBe(201);
  });


  test('should mark question helpful and verify increase helpfulness', async () => {
    var firstCount = 0;
    var updateCount = 0;

    const getRequest = await request(API_URL)
      .get('/qa/questions')
      .set('Authorization', API_KEY)
      .query({'product_id': testProductID, count: 100})
      .catch((err) => console.log('err on GET', err));

    expect(getRequest.status).toBe(200);
    let result1 = getRequest.body.results;
    for (var i = 0; i < result1.length; i++) {
      if (result1[i].question_id === testQuestionID) {
        firstCount = result1[i].question_helpfulness;
      }
    }

    const putRequest = await request(API_URL)
      .put(`/qa/questions/${testQuestionID}/helpful`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on PUT', err));

    expect(putRequest.status).toBe(204);

    const newGetRequest = await request(API_URL)
      .get('/qa/questions')
      .set('Authorization', API_KEY)
      .query({'product_id': testProductID, count: 100})
      .catch((err) => console.log('err on GET', err));

    expect(newGetRequest.status).toBe(200);
    let result2 = newGetRequest.body.results;
    for (var i = 0; i < result2.length; i++) {
      if (result2[i].question_id === testQuestionID) {
        updateCount = result2[i].question_helpfulness;
      }
    }

    expect(updateCount).toEqual(firstCount + 1);
  });

  test('should mark answer helpful and verify increase helpfulness', async () => {
    var firstCount = 0;
    var updateCount = 0;
    var firstAnswerID = 0;
    var newAnwerID = 0;

    const getRequest = await request(API_URL)
      .get(`/qa/questions/${testQuestionID}/answers`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on GET', err));

    expect(getRequest.status).toBe(200);
    firstAnswerID = getRequest.body.results[0].answer_id;
    firstCount = getRequest.body.results[0].helpfulness;

    const putRequest = await request(API_URL)
      .put(`/qa/answers/${firstAnswerID}/helpful`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on PUT', err));

    expect(putRequest.status).toBe(204);

    const newGetRequest = await request(API_URL)
      .get(`/qa/questions/${testQuestionID}/answers`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on GET', err));

    expect(newGetRequest.status).toBe(200);
    newAnwerID = newGetRequest.body.results[0].answer_id;
    updateCount = newGetRequest.body.results[0].helpfulness;

    expect(newAnwerID).toEqual(firstAnswerID);
    expect(updateCount).toEqual(firstCount + 1);
  });

  test('should report an answer and verify being reported', async () => {
    var firstAnswerID = 0;

    const getRequest = await request(API_URL)
      .get(`/qa/questions/${testQuestionID}/answers`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on GET', err));

    expect(getRequest.status).toBe(200);
    firstAnswerID = getRequest.body.results[0].answer_id;

    const putRequest = await request(API_URL)
      .put(`/qa/answers/${firstAnswerID}/report`)
      .set('Authorization', API_KEY)
      .catch((err) => console.log('err on PUT', err));

    expect(putRequest.status).toBe(204);

    const main = async () => {
      await getRequest;
      await putRequest;

      const newGetRequest = await request(API_URL)
        .get(`/qa/questions/${testQuestionID}/answers`)
        .set('Authorization', API_KEY)
        .catch((err) => console.log('err on GET', err));

      expect(newGetRequest.status).toBe(200);
      expect(newGetRequest.body.results.length).toEqual(getRequest.body.results.length - 1);
    };
  });

});