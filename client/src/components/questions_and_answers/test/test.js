import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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

describe.only('Test on Modal Form Features', () => {

  var props = {};
  beforeEach(() => {
    props = {
      product: exampleQuestions.product,
      questions: exampleQuestions.results
    };
  });

  test('Test on click add question', () => {
    render(<QuestionsAndAnswers {...props}/>);
    const btn = screen.getByText('ADD A QUESTION');
    fireEvent.click(btn);
    const form = document.querySelector('#new-question-modal');
    expect(form).toBeInTheDocument();

  });

  test('Test on question modal', () => {
    const testData = {body: 'Can I wash it?', nickname: 'tobi', email: 'tobi@email.com'};

    render(<QuestionModal productName={props.productName}/>);
  });

  test('Test on answer modal', () => {
    render(<AnswerModal productName={props.productName} question={props.questions[1]}/>);
  });
});

/**
 * Error boundary tests
 */

describe('Test on errors', () => {

});