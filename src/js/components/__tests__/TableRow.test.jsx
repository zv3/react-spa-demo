/* @flow */
/* eslint-env jest */
import React from 'react'
import { shallow, mount } from 'enzyme'
import { TableRow } from 'js/components/TableRow'
import InitialData from 'js/consts/data'
import { Link } from 'react-router'
import { PROCESS_STATE_COMPLETED, PROCESS_STATE_RUNNING, PROCESS_STATE_PENDING, PROCESS_STATE_FAILED } from 'js/consts/processStates'
import { ITEM_TYPE_FIREWALL, ITEM_TYPE_BUILD } from 'js/consts/itemTypes'

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

  it('has the row\'s state set as pending if the state of each of the processes is also set as pending', () => {
    const props = { ...propsWhenCollapsed }

    props.item.metrics.state = PROCESS_STATE_PENDING
    props.item.build.state = PROCESS_STATE_PENDING
    props.item.unitTest.state = PROCESS_STATE_PENDING
    props.item.functionalTest.state = PROCESS_STATE_PENDING

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--pending')
    ).toBe(true)
  })

  it('has the row\'s state set as succeeded if the state of each of the processes is set as completed', () => {
    const props = { ...propsWhenCollapsed }

    props.item.metrics.state = PROCESS_STATE_COMPLETED
    props.item.build.state = PROCESS_STATE_COMPLETED
    props.item.unitTest.state = PROCESS_STATE_COMPLETED
    props.item.functionalTest.state = PROCESS_STATE_COMPLETED

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--succeeded')
    ).toBe(true)
  })

  it('has the row\'s state set as running if there is a process with it\'s state set as running', () => {
    const props = { ...propsWhenCollapsed }

    props.item.metrics.state = PROCESS_STATE_COMPLETED
    props.item.build.state = PROCESS_STATE_COMPLETED
    props.item.unitTest.state = PROCESS_STATE_COMPLETED
    props.item.functionalTest.state = PROCESS_STATE_RUNNING

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--running')
    ).toBe(true)
  })

  it('has the row\'s state set as rejected if there is a process with it\'s state set as failed', () => {
    const props = { ...propsWhenCollapsed }

    props.item.metrics.state = PROCESS_STATE_COMPLETED
    props.item.build.state = PROCESS_STATE_COMPLETED
    props.item.unitTest.state = PROCESS_STATE_COMPLETED
    props.item.functionalTest.state = PROCESS_STATE_FAILED

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--rejected')
    ).toBe(true)
  })

  it('has the row\'s type as firewall if the item\'s type is set as such', () => {
    const props = { ...propsWhenCollapsed }

    props.item.type = ITEM_TYPE_FIREWALL

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--firewall')
    ).toBe(true)
  })

  it('has the row\'s type as build if the item\'s type is set as such', () => {
    const props = { ...propsWhenCollapsed }

    props.item.type = ITEM_TYPE_BUILD

    const wrapper = shallow(<TableRow {...props} />)

    expect(
      wrapper
        .hasClass('item--build')
    ).toBe(true)
  })
})
