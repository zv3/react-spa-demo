/* @flow */
/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import TableRowExpanded from 'js/components/TableRowExpanded'
import InitialData from 'js/consts/data'

describe('Component: TableRowExpanded', () => {
  const baseProps = {
    item: InitialData[1]
  }

  it('renders without exploding', () => {
    expect(
      shallow(<TableRowExpanded {...baseProps} />).length
    ).toBe(1)
  })
})
