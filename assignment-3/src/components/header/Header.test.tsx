import { render, screen } from '@testing-library/react'

import { Header } from './Header'

test('renders Header', () => {
  render(<Header />)
  const text = screen.getByText(/GitHub/i)
  expect(text).toBeDefined()
})
