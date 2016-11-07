/* @flow */
const initialLocation = { pathname: '/', search: '', hash: '' }

export function locationReducer (state = initialLocation, action: ReduxAction) { // eslint-disable-line
  return action.type === 'LOCATION_CHANGE' ? action.location : state
}
