import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';

import QuestionsAndAnswers from '../q&a.jsx';

describe('Q&A', () => {
  test('render Q&A component', () => {
    render(<QuestionsAndAnswers/>);
  });
});