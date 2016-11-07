/* @flow */
/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { TableRow } from 'js/components/TableRow'
import InitialData from 'js/consts/data'
import { Link } from 'react-router'

describe('Component: TableRow', () => {
  const propsWhenExpanded = {
    item: InitialData[1],
    location: {
      pathname: '/items/432462'
    }
  }
  const propsWhenCollapsed = {
    ...propsWhenExpanded,
    location: {
      pathname: '/'
    }
  }

  it('renders without exploding', () => {
    expect(
      shallow(<TableRow {...propsWhenExpanded} />).length
    ).toBe(1)
  })

  it('links back to the index page (no expanded row) when expanded', () => {
    const wrapper = mount(<TableRow {...propsWhenExpanded} />)

    expect(
      wrapper
        .find(Link).props().to
    ).toBe('/')
  })

  it('links to the item when collapsed', () => {
    const wrapper = mount(<TableRow {...propsWhenCollapsed} />)

    expect(
      wrapper
        .find(Link).props().to
    ).toBe('/items/432462')
  })

  it('activates the row when collapsed and clicked on it', () => {
    const wrapper = mount(<TableRow {...propsWhenCollapsed} />)

    expect(
      wrapper
        .setProps(propsWhenExpanded)
        .find('a.table-row')
        .hasClass('table-row--active')
    ).toBe(true)
  })
})
