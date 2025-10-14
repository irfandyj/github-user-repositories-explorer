import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchUserCard from './SearchUserCard'

describe('SearchUserCard', () => {
  it('renders correctly', () => {
    render(<SearchUserCard />)
    expect(screen.getByTestId('search-user-card')).toBeInTheDocument()
  })
})

it.todo('should render SearchUserForm')
it.todo('should render SearchUserAccordion')
it.todo('should be able to search for a user')
it.todo('should be able to display the user\'s repositories')