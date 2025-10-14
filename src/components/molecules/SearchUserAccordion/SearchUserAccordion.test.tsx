import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchUserAccordion from './SearchUserAccordion'

describe('SearchUserAccordion', () => {
  it('renders correctly', () => {
    render(<SearchUserAccordion users={[]} />)
    expect(screen.getByTestId('search-user-accordion')).toBeInTheDocument()
  })

  // it('displays loading state when loading is true', () => {
  //   render(<SearchUserAccordion users={[]} loading={true} />)
  //   expect(screen.getByTestId('search-user-accordion')).toBeInTheDocument()
  // })
  it.todo('should display loading state when loading is true')
  it.todo('should display the user\'s repositories')
  it.todo('should display "No repositories found" when there are no repositories found with the user')
})
