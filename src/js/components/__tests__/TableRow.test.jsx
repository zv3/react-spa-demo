/* @flow */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableRow } from 'js/components/TableRow';
import TableRowExpanded from 'js/components/TableRowExpanded';
import InitialData from 'js/consts/data';
import { Link } from 'react-router';
import appStore from 'js/store';

describe('Component: TableRow', () => {
  const propsWhenExpanded = {
          item     : InitialData[0],
          location : {
            pathname: '/items/Tenrox-R1_1235'
          }
        },
        propsWhenCollapsed = {
          ...propsWhenExpanded,
          location: {
            pathname: '/'
          }
        };

  it('renders without exploding', () => {
    expect(
      shallow(<TableRow {...propsWhenExpanded} />).length
    ).toBe(1);
  });

  it('links back to the index page (no expanded row) when expanded', () => {
    const wrapper = mount(<TableRow {...propsWhenExpanded} />);

    expect(
      wrapper
        .find(Link).props().to
    ).toBe('/');
  });

  it('links to the item when collapsed', () => {
    const wrapper = mount(<TableRow {...propsWhenCollapsed} />);

    expect(
      wrapper
        .find(Link).props().to
    ).toBe('/items/Tenrox-R1_1235');
  });

  it('activates the row when collapsed and clicked on it', () => {
    const wrapper = mount(<TableRow {...propsWhenCollapsed} />);
    console.log('When Collapsed');
    console.log(wrapper.debug());
    wrapper.find('a').simulate('click');
    console.log('When Expanded');
    console.log(wrapper.debug());
    expect(
      wrapper
        .find('a.item-row')
        .hasClass('item-row--active')
    ).toBe(true);
  });

  it('expands the row when collapsed and clicked on it', () => {
    const wrapper = mount(<TableRow {...propsWhenCollapsed} />);

    expect(
      wrapper
        .find('a.item-row')
        .simulate('click')
        .find(TableRowExpanded).length
    ).toBe(1);
  });
});
