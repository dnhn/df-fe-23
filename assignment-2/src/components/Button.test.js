import { render, screen } from '@testing-library/react';

import Button from './Button';

test('renders Button', () => {
  render(<Button>click me</Button>);
  expect(screen.getByText(/click me/i)).toBeInTheDocument();
});
