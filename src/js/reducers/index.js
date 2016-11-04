/* @flow */
import { locationReducer } from 'js/reducers/locationReducer';
import { combineReducers } from 'redux';

// This is my state model and each reducer maps to each store property
export default combineReducers({
  location: locationReducer
});
