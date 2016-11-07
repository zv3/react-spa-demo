/* @flow */
import { ITEM_TYPE_FIREWALL, ITEM_TYPE_BUILD } from 'js/consts/itemTypes'
import { PROCESS_STATE_COMPLETED, PROCESS_STATE_RUNNING, PROCESS_STATE_PENDING, PROCESS_STATE_FAILED } from 'js/consts/processStates'
import { ITEM_STATE_REJECTED, ITEM_STATE_SUCCEEDED, ITEM_STATE_PENDING, ITEM_STATE_RUNNING } from 'js/consts/itemStates'
import React from 'react'
import { Match, Link } from 'react-router'
import { TransitionMotion, spring } from 'react-motion'
import { connect } from 'react-redux'
import ProgressBar from 'js/components/ProgressBar'
import TableRowExpanded from 'js/components/TableRowExpanded'
import classNames from 'classnames'

type Props = {
  location: Object | string,
  item: AppItem
};

export class TableRow extends React.Component {
  props: Props

  constructor (props: Props) {
    super(props)

    this.props.item.state = this.itemState()
  }

  itemState (): string {
    const { item } = this.props

    if (item.metrics.state === PROCESS_STATE_COMPLETED && item.build.state === PROCESS_STATE_COMPLETED &&
      item.unitTest.state === PROCESS_STATE_COMPLETED && item.functionalTest.state === PROCESS_STATE_COMPLETED) {
      return ITEM_STATE_SUCCEEDED
    }

    if (item.metrics.state === PROCESS_STATE_PENDING && item.build.state === PROCESS_STATE_PENDING &&
      item.unitTest.state === PROCESS_STATE_PENDING && item.functionalTest.state === PROCESS_STATE_PENDING) {
      return ITEM_STATE_PENDING
    }

    if (item.metrics.state === PROCESS_STATE_RUNNING || item.build.state === PROCESS_STATE_RUNNING ||
      item.unitTest.state === PROCESS_STATE_RUNNING || item.functionalTest.state === PROCESS_STATE_RUNNING) {
      return ITEM_STATE_RUNNING
    }

    return ITEM_STATE_REJECTED
  }

  static processClasses (state: string = PROCESS_STATE_COMPLETED) {
    return classNames({
      'item__process': true,
      'item__process--completed': state === PROCESS_STATE_COMPLETED,
      'item__process--running': state === PROCESS_STATE_RUNNING,
      'item__process--pending': state === PROCESS_STATE_PENDING,
      'item__process--failed': state === PROCESS_STATE_FAILED
    })
  }

  render () {
    let startDateTime, itemRowState

    const { item, location } = this.props

    let rowClasses = classNames({
      'item': true,
      'item--firewall': item.type === ITEM_TYPE_FIREWALL,
      'item--build': item.type === ITEM_TYPE_BUILD
    })

    if (item.startTimeTs) {
      startDateTime = new Date(item.startTimeTs * 1000).toLocaleString()
    }

    if (item.state === ITEM_STATE_PENDING) {
      rowClasses += ' item--pending'
      itemRowState = 'Pending'
    } else if (item.state === ITEM_STATE_RUNNING) {
      rowClasses += ' item--running'
      itemRowState = 'Running'
    } else if (item.state === ITEM_STATE_SUCCEEDED && item.type === ITEM_TYPE_FIREWALL) {
      rowClasses += ' item--succeeded'
      itemRowState = 'Accepted'
    } else if (item.state === ITEM_STATE_SUCCEEDED && item.type === ITEM_TYPE_BUILD) {
      rowClasses += ' item--succeeded'
      itemRowState = 'Complete'
    } else {
      rowClasses += ' item--rejected'
      itemRowState = 'Rejected'
    }

    return (
      <div className={rowClasses}>
        <TableRowLink item={item} location={location}>
          <div className='table-column item__icon'>&nbsp;</div>
          <div className='table-column item__id'>{item.id}</div>
          <div className='table-column item__owner'>{item.owner || '\u2014'}</div>
          <div className='table-column item__startTime'>{startDateTime || '\u2014'}</div>
          <div className='table-column item__state'>{itemRowState}</div>
          <div className={'table-column ' + TableRow.processClasses(item.metrics.state)}>
            <ProgressBar percent={item.metrics.progressPercent} />
          </div>
          <div className={'table-column ' + TableRow.processClasses(item.build.state)}>
            <ProgressBar percent={item.build.progressPercent} />
          </div>
          <div className={'table-column ' + TableRow.processClasses(item.unitTest.state)}>
            <ProgressBar percent={item.unitTest.progressPercent} />
          </div>
          <div className={'table-column ' + TableRow.processClasses(item.functionalTest.state)}>
            <ProgressBar percent={item.functionalTest.progressPercent} />
          </div>
        </TableRowLink>

        <MatchWithAnimation
          location={location}
          pattern={`/items/${item.id}`}
          render={() => <TableRowExpanded item={item} />}
        />
      </div>
    )
  }
}

const MatchWithAnimation = ({ render, ...rest }) => {
  const willLeave = () => ({
    zIndex: 1,
    maxHeight: spring(0)
  })

  return (
    <Match {...rest} children={({ matched, ...props }) => (
      <TransitionMotion
        willLeave={willLeave}
        styles={matched ? [{
          key: props.location.pathname,
          style: {
            maxHeight: spring(500)
          }
        }] : []}
      >
        {interpolatedStyles => (
          <div style={{overflow: 'hidden'}}>
            {interpolatedStyles.map(config => (
              <div key={config.key} style={config.style}>
                {render()}
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )} />
  )
}

class TableRowLink extends React.Component {
  props: {
    item: AppItem,
    location: Object | string
  }

  render () {
    const { item, location, ...rest } = this.props
    const isActive = location.pathname === `/items/${item.id}`

    return item.state === ITEM_STATE_PENDING ? (<div className='table-row'>{this.props.children}</div>) : (
      <Link
        to={isActive ? '/' : `/items/${item.id}`} // should link to path '/' when this row is active
        location={location}
        className='table-row'
        activeClassName={!isActive ? '' : 'table-row--active'}
        {...rest}
      />
    )
  }
}

const mapStateToAppProps = (state) => ({ location: state.location })

export default connect(mapStateToAppProps)(TableRow)
