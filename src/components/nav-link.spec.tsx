import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight the properly nav link based in the current active page link ', () => {
    const wrapper = render(
      <>
        <NavLink to="/">Gallery</NavLink>
        <NavLink to="/albums">Albums</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/albums']}>{children}</MemoryRouter>
          )
        },
      },
    )
    // wrapper.debug()

    expect(wrapper.getByText('Gallery').dataset.current).toEqual('false')
    expect(wrapper.getByText('Albums').dataset.current).toEqual('true')
  })
})
