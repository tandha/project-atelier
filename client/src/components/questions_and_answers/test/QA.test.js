import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import {exampleQuestions} from '../exampleData.js';
import QuestionsAndAnswers from '../q&a.jsx';
import QuestionList from '../QuestionList.jsx';

describe.only('Q&A', () => {

  var props = {};

  beforeEach(() => {
    props = {
      // product: exampleQuestions.product_id,
      questions: exampleQuestions.results
    };
  });

  afterEach(cleanup);

  test('render Q&A component', () => {
    render(<QuestionsAndAnswers/>);
    // screen.debug();
  });

  test('render QuestionList component', () => {
    render(<QuestionList questions={props.questions}/>);
    // screen.debug();
  });
});