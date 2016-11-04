/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import TableRowExpanded from 'js/components/TableRowExpanded';

describe('Component: TableRowExpanded', () => {
  it('renders without exploding', () => {
    expect(
      shallow(<TableRowExpanded {...minProps} />).length
    ).toEqual(1);
  });
});
