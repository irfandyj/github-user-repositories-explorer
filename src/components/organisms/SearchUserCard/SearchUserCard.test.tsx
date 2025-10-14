import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SearchUserCard from './SearchUserCard'

describe('SearchUserCard', () => {
  it('renders correctly', () => {
    render(<SearchUserCard />)
    expect(screen.getByTestId('search-user-card')).toBeInTheDocument()
  })

  it('should render SearchUserForm and SearchUserAccordion', () => {
    render(<SearchUserCard />)
    expect(screen.getByTestId('search-user-form')).toBeInTheDocument()
    expect(screen.getByTestId('search-user-accordion')).toBeInTheDocument()
  })

  it('should be able to search for a user', () => {
    render(<SearchUserCard />)
    const searchUserForm = screen.getByTestId('SearchUserForm__input')
    fireEvent.change(searchUserForm, { target: { value: 'test' } })
    fireEvent.submit(searchUserForm)
    expect(screen.getByTestId('search-user-accordion')).toBeInTheDocument()
  })

  it('only display the first 5 users', async () => {
    render(<SearchUserCard />)
    const searchUserForm = screen.getByTestId('SearchUserForm__input')
    fireEvent.change(searchUserForm, { target: { value: 'test' } })
    fireEvent.submit(searchUserForm)

    await new Promise(resolve => setTimeout(resolve, 3000))

    expect(screen.getAllByTestId('SearchUserAccordion__accordion-item')).toHaveLength(5)
  })
  
})
