import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button', () => {
  render(<Button label="click me" />);
  const element = screen.getByText(/click me/i);
  expect(element).toBeInTheDocument();
});
