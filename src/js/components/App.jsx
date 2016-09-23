/* @flow */
import React from 'react';
import TableRow from 'js/components/TableRow';

type Props = {
  data: Object,
  params: {
    itemId: ?number
  },
  pathname: string
};

export default class App extends React.Component {
  props: Props

  renderTableRows() {
    if (this.props.data.length > 0) {
      console.log('Rendering table rows!');
      return this.props.data.map((elem: Object, key: string) => {
        // const isExpanded = this.state.expandedItemId === elem.id;

        return (
          <TableRow
            key={key}
            item={elem} />
        );
      });
    } else {
      return [];
    }
  }

  render() {
    const tableRows = this.renderTableRows();
    console.log(tableRows);
    return (
      <div className="wrapper">
        <div className="item item--header">
          <div className="item__icon">&nbsp;</div>
          <div className="item__id">Changelist / Build</div>
          <div className="item__owner">Owner</div>
          <div className="item__startTime">Start Time</div>
          <div className="item__state">State</div>
          <div className="item__process">Metrics</div>
          <div className="item__process">Build</div>
          <div className="item__process">Unit Test</div>
          <div className="item__process">Functional Test</div>
        </div>
        {tableRows}
      </div>
    );
  }
}
