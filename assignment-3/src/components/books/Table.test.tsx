import { screen, render } from '@testing-library/react'

import { Table } from './Table'

test('renders Table with records', () => {
  render(<Table />)
  const elements = screen.getAllByText(/Delete/i)
  expect(elements.length).toBe(5)
  elements.forEach((element) => expect(element).toBeDefined())
})
