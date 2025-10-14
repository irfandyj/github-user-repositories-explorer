import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders correctly', () => {
    render(<App />)
    expect(screen.getByTestId('app')).toBeInTheDocument()
  })
})

it.todo('should render SearchUserCard')
it.todo('should render in the middle of the screen')