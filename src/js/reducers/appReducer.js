/* @flow */
import {viewCreated, toggleLocateModal, toggleShareModal, toggleRegisterAsDonorModal, getItemInfo } from 'js/reducers/mapReducers';
import { combineReducers } from 'redux';

// This is my state model and each reducer maps to each store property
export default combineReducers({
  locateModalVisible          : toggleLocateModal,
  shareModalVisible           : toggleShareModal,
  registerAsDonorModalVisible : toggleRegisterAsDonorModal,
  viewReady                   : viewCreated,
  itemInfo                    : getItemInfo
});
