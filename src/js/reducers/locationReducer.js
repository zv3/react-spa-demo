/* @flow */
const initialLocation = { pathname: '/', search: '', hash: '' };

export function locationReducer(state = initialLocation, action: ReduxAction) {
  return action.type === 'LOCATION_CHANGE' ? action.location : state;
}
