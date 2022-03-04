import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';

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

const request = require('supertest');
const { API_URL, API_KEY } = require('../../../../../server/config.js');
axios.defaults.baseURL = API_URL;

/**
 * Test on End points
 */

describe('Test on API end points', () => {

  let testProductID = 64622;
  let testQuestionID = 573794;

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