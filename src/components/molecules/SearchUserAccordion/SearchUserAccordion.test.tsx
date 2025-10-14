import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchUserAccordion from './SearchUserAccordion'

const users = [
  {
    id: 1,
    login: 'joanna',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
  {
    id: 2,
    login: 'john',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
  {
    id: 3,
    login: 'jane',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
  {
    id: 4,
    login: 'jim',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
  {
    id: 5,
    login: 'jill',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
  {
    id: 6,
    login: 'jane',
    avatar_url: 'https://test.com',
    html_url: 'https://test.com',
  },
]

describe('SearchUserAccordion', () => {
  it('renders correctly', () => {
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={false}
      data={[]}
      send={() => { }}
    />)
    expect(screen.getByTestId('search-user-accordion')).toBeInTheDocument()
  })

  it('should display loading state (skeleton) when usersLoading is true', () => {
    render(<SearchUserAccordion
      users={users}
      usersLoading={true}
      dataLoading={false}
      data={[]}
      send={() => { }}
    />)
    expect(screen.getAllByTestId('search-user-accordion-skeleton')).toHaveLength(5)
  })

  it('should display an avatar and a username link for each user', () => {
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={false}
      data={[]}
      send={() => { }}
    />)
    expect(screen.getAllByTestId('user-avatar')).toHaveLength(users.length)
    expect(screen.getByRole('link', { name: /joanna/i }))
      .toHaveAttribute('href', users[0].html_url)
  })

  it('should display "No data" when there are no users', () => {
    render(<SearchUserAccordion
      users={[]}
      usersLoading={false}
      dataLoading={false}
      data={[]}
      send={() => { }}
    />)
    expect(screen.getByText('No data')).toBeInTheDocument()
    expect(screen.getByText('No data found')).toBeInTheDocument()
  })

  it('should call send when the accordion trigger is clicked', async () => {
    const user = userEvent.setup()
    const send = vi.fn()
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={false}
      data={[]}
      send={send}
    />)
    
    const accordionTrigger = screen.getAllByRole('button')[0]
    await user.click(accordionTrigger)
    
    expect(send).toHaveBeenCalledWith(users[0].login)
  })

  it('should display loading state (loader) when dataLoading is true', async () => {
    const user = userEvent.setup()
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={true}
      data={[]}
      send={() => { }}
    />)

    const accordionTrigger = screen.getAllByRole('button')[0]
    await user.click(accordionTrigger)

    expect(screen.getByTestId('SearchUserAccordion__data-loader')).toBeInTheDocument()
  })


  it('should display "No repositories found" when there are no repositories found with the user', async () => {
    const user = userEvent.setup()
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={false}
      data={[]}
      send={() => { }}
    />)

    const accordionTrigger = screen.getAllByRole('button')[0]
    await user.click(accordionTrigger)

    expect(screen.getByText('No repositories found')).toBeInTheDocument()
  })

  it('should display the user\'s repositories', async () => {
    const user = userEvent.setup()
    const repositories = [
      {
        id: 1,
        name: 'test-repo',
        html_url: 'https://test.com',
        description: 'test',
        stargazers_count: 1,
      },
    ]
    render(<SearchUserAccordion
      users={users}
      usersLoading={false}
      dataLoading={false}
      data={repositories}
      send={() => { }}
    />)

    const accordionTrigger = screen.getAllByRole('button')[0]
    await user.click(accordionTrigger)

    expect(screen.getAllByText('test-repo')).toHaveLength(repositories.length)
  })
})
