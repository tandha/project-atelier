import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
jest.mock('axios');
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

import httpAdapter from 'axios/lib/adapters/http';
axios.defaults.adapter = httpAdapter;
const { API_URL, API_KEY } = require('../../../../../server/config.js');
axios.defaults.baseURL = API_URL;
axios.defaults.headers['Authorization'] = API_KEY;
/**
 * Render tests
 */
describe('Q&A render tests', () => {
  var props = {};
  beforeEach(() => {
    props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
  });

  afterEach(cleanup);

  test('render Q&A main page', () => {
    axios.mockResolvedValueOnce({data: {data: {results: props.questions}}});
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

/**
 * more widget feature tests
 */

describe('Test on search bar component', () => {

  test('test on searchBar component', () => {
    let props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
    axios.mockResolvedValueOnce({data: {data: {results: props.questions}}});
    const {queryByPlaceholderText} = render(<QuestionsAndAnswers {...props}/>);
    const searchInput = queryByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
    fireEvent.change(searchInput, { target: { value: 'test'} });
    expect(searchInput.value).toBe('test');
  });

});

describe('Test on Question Features', () => {

  var props = {};
  beforeEach(() => {
    props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
  });

  test('test on QuestionList component', () => {
    const {rerender} = render(<QuestionList questions={props.questions} questionNumbers={2}/>);
    const list = screen.getByRole('qlist');
    expect(list.children.length).toEqual(2);

    rerender(<QuestionList questions={props.questions} questionNumbers={4}/>);
    const newlist = screen.getByRole('qlist');
    expect(newlist.children.length).toEqual(4);
    // test on sort by helpfulness
  });

  test('test on Question component', () => {
    render(<Question question={props.questions[1]}/>);
    // test on click more answers event
  });

});

describe('Test on Answer Features', () => {
  var props = {};
  beforeEach(() => {
    props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
  });

  test('render AnswerList component', () => {
    const answerArray = Object.values(props.questions[1].answers);
    render(<AnswerList answers={answerArray} answerNumbers={answerArray.length}/>);
  });

  test('render Answer component', () => {
    const answerArray = Object.values(props.questions[1].answers);
    render(<Answer answer={answerArray[0]}/>);

    // test on sort by helpfulness

    // test on click helpful event
    // const helpfulBtn = screen.getByRole('help');
    // expect(helpfulBtn).not.toBeDisabled();
    // fireEvent.click(helpfulBtn);
    // expect(helpfulBtn).toBeDisabled();

    // test on click report event
  });

  test('render Answer photo form component', () => {
    const answerArray = Object.values(props.questions[2].answers);
    const photo = answerArray[0].photos[0];
    render(<AnswerPhoto photo={photo}/>);
  });
});

describe('Test on Modal Form Features', () => {

  var props = {};
  beforeEach(() => {
    props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
    axios.mockResolvedValueOnce({data: {data: {results: props.questions}}});
  });
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  test('Test on click add question', () => {
    render(<QuestionsAndAnswers {...props}/>);
    const btn = screen.getByText('ADD A QUESTION');
    fireEvent.click(btn);
    const form = document.querySelector('#new-question-modal');
    expect(form).toBeInTheDocument();
  });

  test('Test on question modal', () => {
    const testData = {body: 'Can I wash it', nickname: 'tobi', email: 'tobi@email.com'};

    render(<QuestionModal productName={props.productName}/>);
    const testBody = document.querySelector('#your-question');
    const testNickname = document.querySelector('#question-nickname');
    const testEmail = document.querySelector('#question-email');

    fireEvent.change(testBody, { target: { value: testData.body} });
    fireEvent.change(testNickname, { target: { value: testData.nickname} });
    fireEvent.change(testEmail, { target: { value: testData.email} });

    expect(testBody.value).toBe(testData.body);
    expect(testNickname.value).toBe(testData.nickname);
    expect(testEmail.value).toBe(testData.email);
  });

  test('Test on submit add question', () => {
    const testData = {body: 'Can I wash it', nickname: 'tobi', email: 'tobi@email.com'};

    render(<QuestionsAndAnswers {...props}/>);

    const btn = screen.getByText('ADD A QUESTION');
    fireEvent.click(btn);

    jest.clearAllMocks();
    axios.mockResolvedValueOnce({status: 201});

    const formInput = document.querySelector('#submit-question-form');
    fireEvent.submit(formInput, {target: [{value: testData.body}, {value: testData.nickname}, {value: testData.email}]});

    const form = document.querySelector('#new-answer-modal');
    expect(form).not.toBeInTheDocument();
  });

  test('Test on click add answer', () => {
    render(<Question question={props.questions[1]}/>);
    const btn = screen.getByText('Add Answer');
    fireEvent.click(btn);
    const form = document.querySelector('#new-answer-modal');
    expect(form).toBeInTheDocument();

  });

  test.only('Test on answer modal', () => {
    const testData = {body: 'Not sure', nickname: 'tobi', email: 'tobi@email.com', photo: 'https://i.ibb.co/xXxgndP/30bfbeec39a9.jpg'};

    jest.clearAllMocks();
    axios.mockResolvedValueOnce({data: {data: {url: testData.photo}}});

    render(<AnswerModal productName={props.productName} question={props.questions[1]}/>);
    const testBody = document.querySelector('#answer-body');
    const testNickname = document.querySelector('#answer-nickname');
    const testEmail = document.querySelector('#answer-email');
    const uploadBtn = document.querySelector('#upload-answer-photo');

    fireEvent.change(testBody, { target: { value: testData.body} });
    fireEvent.change(testNickname, { target: { value: testData.nickname} });
    fireEvent.change(testEmail, { target: { value: testData.email} });
    fireEvent.change(uploadBtn, 'file1.jpg');

    expect(testBody.value).toBe(testData.body);
    expect(testNickname.value).toBe(testData.nickname);
    expect(testEmail.value).toBe(testData.email);

    // expect(uploadBtn).toHaveStyle('visibility: visible;');

    // const container = document.querySelector('#QA-preview-container');
    // const img = new Image();
    // container.appendChild(img);
    // container.appendChild(img);
    // container.appendChild(img);
    // container.appendChild(img);

    // expect(uploadBtn).toHaveStyle('visibility: hidden');
  });
});

/**
 * Error boundary tests
 */

describe('Test on errors', () => {

});