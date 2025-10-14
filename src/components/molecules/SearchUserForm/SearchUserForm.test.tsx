import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchUserForm from './SearchUserForm'

describe('SearchUserForm', () => {

  it('renders correctly', () => {
    render(<SearchUserForm loading={false} onSubmit={vi.fn()} />)
    expect(screen.getByTestId('search-user-form')).toBeInTheDocument()
  })

  it("successfully calls onSubmit when form is submitted", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<SearchUserForm loading={false} onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText(/search/i), 'octocat')
    await user.click(screen.getByRole('button', { name: /search/i }))
  })

  it("has correct loading animation when loading is true", async () => {
    render(<SearchUserForm loading={true} onSubmit={vi.fn()} />)
    expect(screen.getByTestId('loading-icon')).toHaveClass('animate-spin')
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled()
    expect(screen.getByText("Searching...")).toBeInTheDocument()
  })

  it("disables submit button when form is invalid", async () => {
    const user = userEvent.setup()
    render(<SearchUserForm loading={false} onSubmit={vi.fn()} />)
    await user.type(screen.getByLabelText(/search/i), 't')
    await user.click(screen.getByRole('button', { name: /search/i }))
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled()
  })

  it("displays error message when username is invalid after one successful submit", async () => {
    const user = userEvent.setup()
    render(<SearchUserForm loading={false} onSubmit={vi.fn()} />)
    await user.type(screen.getByLabelText(/search/i), 'test')
    await user.click(screen.getByRole('button', { name: /search/i }))
    await user.clear(screen.getByLabelText(/search/i))
    expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument()
  })
})