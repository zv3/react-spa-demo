/* @flow */
import React from 'react'
import { ITEM_TYPE_FIREWALL, ITEM_TYPE_BUILD } from 'js/consts/itemTypes'
import { ITEM_STATE_SUCCEEDED, ITEM_STATE_REJECTED } from 'js/consts/itemStates'
import { PROCESS_STATE_FAILED } from 'js/consts/processStates'

const failedReason = (item: AppItem) => {
  if (item.metrics.state === PROCESS_STATE_FAILED) {
    return 'Metrics Reduction'
  } else if (item.build.state === PROCESS_STATE_FAILED) {
    return 'Build Failing'
  } else if (item.unitTest.state === PROCESS_STATE_FAILED) {
    return 'Failing Unit Tests'
  } else if (item.functionalTest.state === PROCESS_STATE_FAILED) {
    return 'Failing Functional Tests'
  }

  return ''
}

type ResultsBoxWrapperProps = {
  state: string,
  type: ?string
};

type FailingResultsProps = {
  reason: string
};

const ResultsBoxWrapper = ({ state, type = '', children }: ResultsBoxWrapperProps) => (
  <div className={`details-box details-box--${state} results-box results-box--${type}`}>
    <p>Result:</p>
    {children}
  </div>
)

const FirewallRejected = ({ reason }: FailingResultsProps) => (
  <ResultsBoxWrapper state='failed' type='firewall'>
    <p className='results-box__result-text results-box__result-text--sm'>Change Rejected</p>
    <p className='results-box__result-text results-box__result-text--lg'>{reason}</p>
    <button className='button results-box__action-btn'><i className='icon-search' /> Find Issues</button>
  </ResultsBoxWrapper>
)

const FirewallAccepted = () => (
  <ResultsBoxWrapper state='completed' type='firewall'>
    <p className='results-box__result-text results-box__result-text--sm'>Change Accepted</p>
    <p className='results-box__result-text results-box__result-text--lg'>Auto-Merged</p>
    <button className='button results-box__action-btn'><i className='icon-git-merge' /> Merge Build</button>
  </ResultsBoxWrapper>
)

const BuildSucceeded = () => (
  <ResultsBoxWrapper state='completed' type='build'>
    <p className='results-box__result-text results-box__result-text--lg'>Complete</p>
    <button className='button results-box__action-btn'><i className='icon-deploy' /> Deploy</button> &nbsp; &nbsp; to:
    <label>
      <select className='results-box__select-menu'>
        <option>Production</option>
        <option>Staging</option>
        <option>Development</option>
      </select>
    </label>
  </ResultsBoxWrapper>
)

const BuildFailed = ({ reason }: FailingResultsProps) => (
  <ResultsBoxWrapper state='failed' type='build'>
    <p className='results-box__result-text results-box__result-text--lg'>Build Failed</p>
    <p className='results-box__result-text results-box__result-text--lg'>{reason}</p>
    <button className='button results-box__action-btn'><i className='icon-search' /> Find Issues</button>
  </ResultsBoxWrapper>
)

const PendingResults = () => (
  <ResultsBoxWrapper state='pending'>
    <p className='results-box__result-text results-box__result-text--lg'>Pending</p>
  </ResultsBoxWrapper>
)

type ResultsBoxProps = {
  item: AppItem
};

const ResultsBox = ({ item }: ResultsBoxProps) => {
  if (item.state === ITEM_STATE_SUCCEEDED) {
    if (item.type === ITEM_TYPE_BUILD) {
      return <BuildSucceeded />
    } else if (item.type === ITEM_TYPE_FIREWALL) {
      return <FirewallAccepted />
    }
  } else if (item.state === ITEM_STATE_REJECTED) {
    if (item.type === ITEM_TYPE_BUILD) {
      return <BuildFailed reason={failedReason(item)} />
    } else if (item.type === ITEM_TYPE_FIREWALL) {
      return <FirewallRejected reason={failedReason(item)} />
    }
  } else {
    return <PendingResults />
  }

  return void 0
}

export { BuildFailed, PendingResults, BuildSucceeded, FirewallAccepted, FirewallRejected }
export default ResultsBox
