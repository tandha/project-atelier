import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import {exampleQuestions} from './exampleData.js';
import QuestionsAndAnswers from '../q&a.jsx';
import SearchBar from '../SearchBar.jsx';
import QuestionList from '../QuestionList.jsx';
import Question from '../Question.jsx';
import AnswerList from '../AnswerList.jsx';
import Answer from '../Answer.jsx';

describe.only('Q&A', () => {

  var props = {};

  beforeEach(() => {
    props = {
      product: exampleQuestions.product_id,
      questions: exampleQuestions.results
    };
  });

  afterEach(cleanup);

  test('render Q&A main page', () => {
    render(<QuestionsAndAnswers/>);

    // test on first render of data
  });

  test('render searchBar component', () => {
    render(<SearchBar/>);

    // test on search event
    const searchBar = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  });

  test('render QuestionList component', () => {
    render(<QuestionList questions={props.questions}/>);

    // test on click more questions event
  });

  test('render Question component', () => {
    render(<Question question={props.questions[1]} answers={props.questions[1].answers}/>);

    // test on sort by helpfulness
    // test on click helpful event
    // test on click more answers event
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
    const helpfulBtn = screen.getByRole('help');
    expect(helpfulBtn).not.toBeDisabled();
    fireEvent.click(helpfulBtn);
    expect(helpfulBtn).toBeDisabled();

    // test on click report event
  });

});