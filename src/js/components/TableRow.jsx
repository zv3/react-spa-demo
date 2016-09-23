/* @flow */
import { ITEM_TYPE_FIREWALL, ITEM_TYPE_BUILD } from 'js/consts/itemTypes';
import { PROCESS_STATE_COMPLETED, PROCESS_STATE_RUNNING, PROCESS_STATE_PENDING, PROCESS_STATE_FAILED } from 'js/consts/processStates';
import { ITEM_STATE_REJECTED, ITEM_STATE_SUCCEEDED, ITEM_STATE_PENDING, ITEM_STATE_RUNNING } from 'js/consts/itemStates';
import React from 'react';
import { Match, Link } from 'react-router';
import { TransitionMotion, spring } from 'react-motion';
import ProgressBar from 'js/components/ProgressBar';
import TableRowExpanded from 'js/components/TableRowExpanded';
import classNames from 'classnames';

type Props = {
  item : {
    id : string,
    type : string,
    owner : ?string,
    startTimeTs : ?number,
    metrics: {
      progressPercent : number,
      state : string,
      test : {
        score : number,
        state : string
      },
      maintainability : {
        score : number,
        state : string
      },
      security : {
        score : number,
        state : string
      },
      workmanship : {
        score : number,
        state : string
      }
    },
    build: {
      progressPercent : number,
      state : string,
      startTimeTs : ?number
    },
    unitTest: {
      progressPercent : number,
      state : string,
      passed : number,
      failed : number,
      coveragePercent : number
    },
    functionalTest: {
      progressPercent : number,
      state : string,
      passed : number,
      failed : number,
      coveragePercent : number
    }
  }
};

export default class TableRow extends React.Component {
  itemRowStateConst: string
  props: Props

  static contextTypes = {
    location: React.PropTypes.object.isRequired
  }

  constructor(props: Props) {
    super(props);

    this.itemRowStateConst = this.itemState();
  }

  onClickRow: () => void = () => {
    if (this.itemRowStateConst !== ITEM_STATE_PENDING &&
      this.itemRowStateConst !== ITEM_STATE_RUNNING) {
      // this.props.onClickRowHandler(this.props.item.id);
    }
  }

  itemState(): string {
    const { item } = this.props;

    if (item.metrics.state === PROCESS_STATE_COMPLETED && item.build.state === PROCESS_STATE_COMPLETED &&
      item.unitTest.state === PROCESS_STATE_COMPLETED && item.functionalTest.state === PROCESS_STATE_COMPLETED) {
      return ITEM_STATE_SUCCEEDED;
    }

    if (item.metrics.state === PROCESS_STATE_PENDING && item.build.state === PROCESS_STATE_PENDING &&
      item.unitTest.state === PROCESS_STATE_PENDING && item.functionalTest.state === PROCESS_STATE_PENDING) {
      return ITEM_STATE_PENDING;
    }

    if (item.metrics.state === PROCESS_STATE_RUNNING || item.build.state === PROCESS_STATE_RUNNING ||
      item.unitTest.state === PROCESS_STATE_RUNNING || item.functionalTest.state === PROCESS_STATE_RUNNING) {
      return ITEM_STATE_RUNNING;
    }

    return ITEM_STATE_REJECTED;
  }

  static processClasses(state: string = PROCESS_STATE_COMPLETED) {
    return classNames({
      'item__process'            : true,
      'item__process--completed' : state === PROCESS_STATE_COMPLETED,
      'item__process--running'   : state === PROCESS_STATE_RUNNING,
      'item__process--pending'   : state === PROCESS_STATE_PENDING,
      'item__process--failed'    : state === PROCESS_STATE_FAILED
    });
  }

  render() {
    let startDateTime, itemRowState;

    const { item } = this.props;

    let rowClasses = classNames({
      'item'           : true,
      'item--firewall' : item.type === ITEM_TYPE_FIREWALL,
      'item--build'    : item.type === ITEM_TYPE_BUILD
    });

    if (item.startTimeTs) {
      startDateTime = new Date(item.startTimeTs * 1000).toLocaleString();
    }

    if (this.itemRowStateConst === ITEM_STATE_PENDING) {
      rowClasses += ' item--pending';
      itemRowState = 'Pending';
    } else if (this.itemRowStateConst === ITEM_STATE_RUNNING) {
      rowClasses += ' item--running';
      itemRowState = 'Running';
    } else if (this.itemRowStateConst === ITEM_STATE_SUCCEEDED && item.type === ITEM_TYPE_FIREWALL) {
      rowClasses += ' item--succeeded';
      itemRowState = 'Accepted';
    } else if (this.itemRowStateConst === ITEM_STATE_SUCCEEDED && item.type === ITEM_TYPE_BUILD) {
      rowClasses += ' item--succeeded';
      itemRowState = 'Complete';
    } else {
      rowClasses += ' item--rejected';
      itemRowState = 'Rejected';
    }

    return (
      <div className={rowClasses}>
        <TableRowLink itemId={item.id}>
          <div className="item__icon">&nbsp;</div>
          <div className="item__id">{item.id}</div>
          <div className="item__owner">{item.owner}</div>
          <div className="item__startTime">{startDateTime}</div>
          <div className="item__state">{itemRowState}</div>
          <div className={TableRow.processClasses(item.metrics.state)}>
            <ProgressBar percent={item.metrics.progressPercent} />
          </div>
          <div className={TableRow.processClasses(item.build.state)}>
            <ProgressBar percent={item.build.progressPercent} />
          </div>
          <div className={TableRow.processClasses(item.unitTest.state)}>
            <ProgressBar percent={item.unitTest.progressPercent} />
          </div>
          <div className={TableRow.processClasses(item.functionalTest.state)}>
            <ProgressBar percent={item.functionalTest.progressPercent} />
          </div>
        </TableRowLink>

        <MatchWithAnimation pattern={`/items/${item.id}`} render={() => <TableRowExpanded item={item} />} />
      </div>
    );
  }
}

const MatchWithAnimation = ({ render, ...rest }) => {
  const willLeave = () => ({
    zIndex       : 1,
    'max-height' : spring(0)
  });

  return (
    <Match {...rest} children={({ matched, ...props }) => (
      <TransitionMotion
        willLeave={willLeave}
        styles={matched ? [{
          key   : props.location.pathname,
          style : {
            'max-height' : 500,
            'overflow'   : 'hidden'
          },
          data  : props
        }] : []}
      >
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map(config => (
              <div key={config.key} style={config.style}>
                {render()}
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )} />
  );
};

class TableRowLink extends React.Component {
  props: {
    itemId: string
  }

  static contextTypes = {
    location: React.PropTypes.object.isRequired
  }

  render() {
    const { itemId, ...rest } = this.props,
      isActive = this.context.location.pathname === `/items/${itemId}`;

    return (
      <Link
        to={isActive ? '/' : `/items/${itemId}`} // should link to path '/' when this row is active
        className="item-row"
        activeClassName={!isActive ? '' : 'item-row--active'}
        {...rest}
      />
    );
  }
}
