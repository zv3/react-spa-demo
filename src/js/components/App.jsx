/* @flow */
import React from 'react';
import TableRow from 'js/components/TableRow';
import CustomRouter from 'js/utils/CustomRouter';

type Props = {
  data: Object[]
};

class App extends React.Component {
  props: Props

  renderTableRows() {
    if (this.props.data.length > 0) {
      console.log('Rendering table rows!');

      return this.props.data.map((elem: Object, idx: number) => {
        return (
          <TableRow
            key={idx}
            item={elem} />
        );
      });
    } else {
      return [];
    }
  }

  render() {
    const tableRows = this.renderTableRows();

    return (
      <CustomRouter>
        <div className="wrapper">
          <div className="table-row item item--header">
            <div className="table-column item__icon">&nbsp;</div>
            <div className="table-column item__id">Changelist / Build</div>
            <div className="table-column item__owner">Owner</div>
            <div className="table-column item__startTime">Start Time</div>
            <div className="table-column item__state">State</div>
            <div className="table-column item__process">Metrics</div>
            <div className="table-column item__process">Build</div>
            <div className="table-column item__process">Unit Test</div>
            <div className="table-column item__process">Functional Test</div>
          </div>
          {tableRows}
        </div>
      </CustomRouter>
    );
  }
}

export default App;
