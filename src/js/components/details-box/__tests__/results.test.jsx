/* @flow */
/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import ResultsBox, { BuildFailed, PendingResults, BuildSucceeded, FirewallAccepted, FirewallRejected } from 'js/components/details-box/results'
import { ITEM_TYPE_FIREWALL, ITEM_TYPE_BUILD } from 'js/consts/itemTypes'
import { ITEM_STATE_SUCCEEDED, ITEM_STATE_REJECTED, ITEM_STATE_PENDING, ITEM_STATE_RUNNING } from 'js/consts/itemStates'
import InitialData from 'js/consts/data'

describe('Component: ResultsBox', () => {
  const baseProps = {
    item: InitialData[1]
  }

  it('renders without exploding', () => {
    expect(
      shallow(<ResultsBox {...baseProps} />).length
    ).toBe(1)
  })

  it('renders the FirewallAccepted stateless component when the firewall item\'s state is set to succeed', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_FIREWALL,
        state: ITEM_STATE_SUCCEEDED
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(FirewallAccepted)
        .length
    ).toBe(1)
  })

  it('renders the BuildSucceeded stateless component when the build item\'s state is set to succeed', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_BUILD,
        state: ITEM_STATE_SUCCEEDED
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(BuildSucceeded)
        .length
    ).toBe(1)
  })

  it('renders the BuildFailed stateless component when the build item\'s state is set to rejected', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_BUILD,
        state: ITEM_STATE_REJECTED
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(BuildFailed)
        .length
    ).toBe(1)
  })

  it('renders the FirewallRejected stateless component when the firewall item\'s state is set to rejected', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_FIREWALL,
        state: ITEM_STATE_REJECTED
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(FirewallRejected)
        .length
    ).toBe(1)
  })

  it('renders the PendingResults stateless component when the build item\'s state is set to pending', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_BUILD,
        state: ITEM_STATE_PENDING
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(PendingResults)
        .length
    ).toBe(1)
  })

  it('renders the PendingResults stateless component when the build item\'s state is set to running', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_BUILD,
        state: ITEM_STATE_RUNNING
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(PendingResults)
        .length
    ).toBe(1)
  })

  it('renders the PendingResults stateless component when the firewall item\'s state is set to pending', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_FIREWALL,
        state: ITEM_STATE_PENDING
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(PendingResults)
        .length
    ).toBe(1)
  })

  it('renders the PendingResults stateless component when the firewall item\'s state is set to running', () => {
    const props = {
      item: {
        ...InitialData[1],
        type: ITEM_TYPE_FIREWALL,
        state: ITEM_STATE_RUNNING
      }
    }

    expect(
      shallow(<ResultsBox {...props} />)
        .find(PendingResults)
        .length
    ).toBe(1)
  })
})
