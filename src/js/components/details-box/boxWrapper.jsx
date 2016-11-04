/* @flow */
import { PROCESS_STATE_COMPLETED, PROCESS_STATE_FAILED, PROCESS_STATE_RUNNING, PROCESS_STATE_PENDING } from 'js/consts/processStates';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

type Props = {
  title : string,
  state : string,
  children ?: React.Element<*>
};

export default class BoxWrapper extends Component {
  props: Props

  boxCssClasses(state: string = PROCESS_STATE_PENDING) {
    return classNames({
      'details-box'            : true,
      'details-box--completed' : state === PROCESS_STATE_COMPLETED,
      'details-box--failed'    : state === PROCESS_STATE_FAILED,
      'details-box--running'   : state === PROCESS_STATE_RUNNING,
      'details-box--pending'   : state === PROCESS_STATE_PENDING
    });
  }

  renderPendingBox() {
    return (
      <div className="details-box__content">
        <div className="details-box__row">
          <div className="details-box__column">
            Pending...
          </div>
        </div>
      </div>
    );
  }

  renderContentWrapper() {

  }

  render() {
    const content =
      this.props.state !== PROCESS_STATE_PENDING && this.props.children || this.renderPendingBox();

    return (
      <div className={this.boxCssClasses(this.props.state)}>
        <p className="details-box__title">{this.props.title}</p>
        {content}
      </div>
    );
  }
}
//
// const BoxPopupLink = ({ itemId, type, ...rest }) => (
//   <Link to={`/item/${itemId}/${type}`} {...rest} />
// );

