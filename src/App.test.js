import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import Ownership from './components/Ownership/Ownership';


test('renders my personal website link', () => {
  act(() => {
    render(<Ownership />);
  });
  const link = screen.getByText(/Vesela Videva/i);
  expect(link).toBeInTheDocument();
});