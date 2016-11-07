/* @flow */
import { PROCESS_STATE_COMPLETED, PROCESS_STATE_FAILED, PROCESS_STATE_RUNNING, PROCESS_STATE_PENDING } from 'js/consts/processStates'
import React from 'react'
import classNames from 'classnames'
import Modal from 'react-modal'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    paddingTop: '30px',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '320px'
  }
}

const boxCssClasses = (state: string = PROCESS_STATE_PENDING) => {
  return classNames({
    'details-box': true,
    'details-box--completed': state === PROCESS_STATE_COMPLETED,
    'details-box--failed': state === PROCESS_STATE_FAILED,
    'details-box--running': state === PROCESS_STATE_RUNNING,
    'details-box--pending': state === PROCESS_STATE_PENDING
  })
}

const renderPendingBox =
  <div className='details-box__content'>
    <div className='details-box__row'>
      <div className='details-box__column'>
        Pending...
      </div>
    </div>
  </div>

type Props = {
  title : string,
  state : string,
  children ?: React.Element<*>
};

export default class BoxWrapper extends React.Component {
  props: Props

  constructor (props: Props) {
    super(props)

    this.state = { modalIsOpen: false }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = (e: Event) => {
    e.preventDefault()
    this.setState({ modalIsOpen: false })
  }

  render () {
    const content =
      this.props.state !== PROCESS_STATE_PENDING && this.props.children || renderPendingBox

    return (
      <div className={boxCssClasses(this.props.state)} onClick={this.openModal}>
        <p className='details-box__title'>{this.props.title}</p>
        {content}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Example Modal'
          style={customModalStyles}
        >
          <h2>{this.props.title}</h2>
          {content}
          <a className='close-button' href='#' onClick={this.closeModal}>
            <span>×</span>
          </a>
        </Modal>
      </div>
    )
  }
}
