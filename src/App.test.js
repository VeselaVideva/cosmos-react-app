import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import Ownership from './components/Ownership/Ownership';
import Loading from './components/Loading/Loading';


test('check if Jest is working properly', () => {
  expect(1).toBe(1);
});

test('renders my personal website link', () => {
  act(() => {
    render(<Ownership />);
  });
  expect(screen.getByText(/Vesela Videva/i)).toBeInTheDocument();
});

test('renders my Loading component', () => {
  act(() => {
    render(<Loading />);
  });
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});